import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocalStorage } from './useLocalStorage';

// ─── Core Hook ───────────────────────────────────────────────────────

/**
 * Generic data-fetching hook.
 *
 * Calls `fetchFn` on mount and whenever `dependencies` change.
 * Cleans up correctly on unmount and handles race conditions
 * when dependencies change mid-flight.
 *
 * @template T
 * @param {(() => Promise<T>) | null} fetchFn
 *   — async function that returns the data.
 *     Pass `null` / `undefined` to skip fetching.
 * @param {any[]} [dependencies=[]]
 *   — array of values that trigger a re-fetch when they change.
 * @returns {{
 *   data: T | null,
 *   loading: boolean,
 *   error: Error | null,
 *   refetch: () => void
 * }}
 *
 * @example
 * const { data: schedule, loading, error, refetch } = useFetch(
 *   () => scheduleService.getSchedule(userId),
 *   [userId],
 * );
 */
export const useFetch = (fetchFn, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(!!fetchFn);
  const [error, setError] = useState(null);

  // Monotonically increasing ID so we can ignore stale responses.
  const fetchIdRef = useRef(0);
  const isMountedRef = useRef(true);

  // Track unmount
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const execute = useCallback(async () => {
    // If no fetch function provided, skip silently
    if (typeof fetchFn !== 'function') {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }

    // Bump fetch ID — any earlier in-flight fetch becomes stale
    const id = ++fetchIdRef.current;

    setLoading(true);
    setError(null);

    try {
      const result = await fetchFn();

      // Only commit if this is still the latest fetch AND mounted
      if (id === fetchIdRef.current && isMountedRef.current) {
        setData(result ?? null);
        setLoading(false);
      }
    } catch (err) {
      if (id === fetchIdRef.current && isMountedRef.current) {
        setError(err instanceof Error ? err : new Error(String(err)));
        setLoading(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchFn]);

  // Auto-fetch on mount and when dependencies change
  useEffect(() => {
    execute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies, execute]);

  return { data, loading, error, refetch: execute };
};

// ─── Variant: Fetch Once ─────────────────────────────────────────────

/**
 * Fetches data exactly once on mount — never refetches on re-render.
 * Ideal for static / rarely-changing data (e.g. campus buildings).
 *
 * @template T
 * @param {(() => Promise<T>) | null} fetchFn
 * @returns {{
 *   data: T | null,
 *   loading: boolean,
 *   error: Error | null,
 *   refetch: () => void
 * }}
 *
 * @example
 * const { data: buildings, loading } = useFetchOnce(
 *   () => campusService.getBuildings(),
 * );
 */
export const useFetchOnce = (fetchFn) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(!!fetchFn);
  const [error, setError] = useState(null);

  const isMountedRef = useRef(true);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const execute = useCallback(async () => {
    if (typeof fetchFn !== 'function') {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await fetchFn();
      if (isMountedRef.current) {
        setData(result ?? null);
        setLoading(false);
      }
    } catch (err) {
      if (isMountedRef.current) {
        setError(err instanceof Error ? err : new Error(String(err)));
        setLoading(false);
      }
    }
  }, [fetchFn]);

  // Fire once on mount
  useEffect(() => {
    if (!hasFetchedRef.current) {
      hasFetchedRef.current = true;
      execute();
    }
  }, [execute]);

  return { data, loading, error, refetch: execute };
};

// ─── Variant: Fetch with Cache ───────────────────────────────────────

/**
 * Caches the fetch result in `localStorage` via `useLocalStorage`.
 *
 * - Returns **cached data instantly** (no loading flash on revisit).
 * - Re-fetches in the background; once resolved the cache and
 *   displayed data are updated silently.
 * - Falls back to normal fetch behaviour if no cache exists yet.
 *
 * @template T
 * @param {string} key
 *   — localStorage key used for caching.
 * @param {(() => Promise<T>) | null} fetchFn
 * @param {any[]} [dependencies=[]]
 * @returns {{
 *   data: T | null,
 *   loading: boolean,
 *   error: Error | null,
 *   refetch: () => void,
 *   cached: boolean
 * }}
 *
 * @example
 * const { data: events, loading, cached } = useFetchWithCache(
 *   'calendar_events',
 *   () => eventService.getEvents(semester),
 *   [semester],
 * );
 */
export const useFetchWithCache = (key, fetchFn, dependencies = []) => {
  const [cachedData, setCachedData, removeCachedData] = useLocalStorage(
    key,
    null,
  );

  const [data, setData] = useState(cachedData);
  const [loading, setLoading] = useState(!cachedData && !!fetchFn);
  const [error, setError] = useState(null);
  const [cached, setCached] = useState(!!cachedData);

  const fetchIdRef = useRef(0);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const execute = useCallback(async () => {
    if (typeof fetchFn !== 'function') {
      setData(null);
      setLoading(false);
      setError(null);
      return;
    }

    const id = ++fetchIdRef.current;

    // Only show loading spinner if there's no cached data to display
    if (!cachedData) setLoading(true);
    setError(null);

    try {
      const result = await fetchFn();

      if (id === fetchIdRef.current && isMountedRef.current) {
        const value = result ?? null;
        setData(value);
        setCachedData(value);
        setLoading(false);
        setCached(false);
      }
    } catch (err) {
      if (id === fetchIdRef.current && isMountedRef.current) {
        // If we have cached data, keep showing it despite the error
        if (!cachedData) {
          setError(err instanceof Error ? err : new Error(String(err)));
        }
        setLoading(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchFn, cachedData, setCachedData]);

  // Auto-fetch on mount and when dependencies change
  useEffect(() => {
    execute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies, execute]);

  return { data, loading, error, refetch: execute, cached };
};
