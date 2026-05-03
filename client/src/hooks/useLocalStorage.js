import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Custom React hook that mirrors `useState` but persists the value
 * to `localStorage` under the given key.
 *
 * @template T
 * @param {string} key         — localStorage key
 * @param {T | (() => T)} initialValue — default value (or lazy initialiser)
 * @returns {[T, (value: T | ((prev: T) => T)) => void, () => void]}
 *   [storedValue, setValue, removeValue]
 *
 * @example
 * const [courses, setCourses, clearCourses] = useLocalStorage('gpa_courses', []);
 * const [theme, setTheme] = useLocalStorage('theme', 'light');
 */
export const useLocalStorage = (key, initialValue) => {
  // ── Read from localStorage (or fall back to initialValue) ────────

  const readValue = useCallback(() => {
    // Resolve lazy initialisers the same way useState does
    const fallback =
      initialValue instanceof Function ? initialValue() : initialValue;

    try {
      const item = window.localStorage.getItem(key);
      if (item === null) return fallback;
      return JSON.parse(item);
    } catch {
      // localStorage unavailable, corrupted JSON, or private-browsing block
      return fallback;
    }
  }, [key, initialValue]);

  const [storedValue, setStoredValue] = useState(readValue);

  // Keep a ref to the key so the storage event listener always
  // sees the latest key without re-subscribing.
  const keyRef = useRef(key);

  // ── Re-read when the key changes between renders ─────────────────

  useEffect(() => {
    keyRef.current = key;
    setStoredValue(readValue());
  }, [key, readValue]);

  // ── setValue — update both React state and localStorage ───────────

  const setValue = useCallback(
    (value) => {
      try {
        // Support functional updates like useState
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));

        // Dispatch a custom event so other tabs / hook instances
        // using the same key can stay in sync.
        window.dispatchEvent(
          new StorageEvent('local-storage', { key }),
        );
      } catch (error) {
        // Quota exceeded or localStorage unavailable
        console.warn(
          `[useLocalStorage] Failed to set key "${key}":`,
          error,
        );
      }
    },
    [key, storedValue],
  );

  // ── removeValue — delete from both state and localStorage ────────

  const removeValue = useCallback(() => {
    try {
      const fallback =
        initialValue instanceof Function ? initialValue() : initialValue;

      setStoredValue(fallback);
      window.localStorage.removeItem(key);

      window.dispatchEvent(
        new StorageEvent('local-storage', { key }),
      );
    } catch (error) {
      console.warn(
        `[useLocalStorage] Failed to remove key "${key}":`,
        error,
      );
    }
  }, [key, initialValue]);

  // ── Cross-tab sync — listen for storage changes ──────────────────

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key && event.key !== keyRef.current) return;

      try {
        const item = window.localStorage.getItem(keyRef.current);
        setStoredValue(item === null ? initialValue : JSON.parse(item));
      } catch {
        // Corrupted data — reset to initial
        setStoredValue(
          initialValue instanceof Function ? initialValue() : initialValue,
        );
      }
    };

    // Native cross-tab event
    window.addEventListener('storage', handleStorage);
    // Custom same-tab event (fired by setValue / removeValue above)
    window.addEventListener('local-storage', handleStorage);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('local-storage', handleStorage);
    };
  }, [initialValue]);

  return [storedValue, setValue, removeValue];
};
