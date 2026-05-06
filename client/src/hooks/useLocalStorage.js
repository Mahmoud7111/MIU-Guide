import { useState, useEffect, useCallback } from 'react';

/**
 * Custom React hook that mirrors `useState` but persists the value
 * to `localStorage` under the given key.
 *
 * @template T
 * @param {string} key         — localStorage key
 * @param {T | (() => T)} initialValue — default value (or lazy initialiser)
 * @returns {[T, (value: T | ((prev: T) => T)) => void, () => void]}
 */
export const useLocalStorage = (key, initialValue) => {
  // Read once lazily to avoid heavy synchronous reads on every render
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue instanceof Function ? initialValue() : initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        return JSON.parse(item);
      }
    } catch (error) {
      console.warn(`[useLocalStorage] Error reading key "${key}":`, error);
    }
    return initialValue instanceof Function ? initialValue() : initialValue;
  });

  // Re-sync if the key changes, without tracking initialValue which breaks references
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      const fallback = initialValue instanceof Function ? initialValue() : initialValue;
      const newValue = item !== null ? JSON.parse(item) : fallback;
      
      setStoredValue(prev => {
        return JSON.stringify(prev) === JSON.stringify(newValue) ? prev : newValue;
      });
    } catch (error) {
      const fallback = initialValue instanceof Function ? initialValue() : initialValue;
      setStoredValue(fallback);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  // Set value and trigger local event
  const setValue = useCallback(
    (value) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;

        setStoredValue(valueToStore);
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
          window.dispatchEvent(new StorageEvent('local-storage', { key }));
        }
      } catch (error) {
        console.warn(`[useLocalStorage] Failed to set key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  // Remove value
  const removeValue = useCallback(() => {
    try {
      const fallback = initialValue instanceof Function ? initialValue() : initialValue;
      setStoredValue(fallback);
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
        window.dispatchEvent(new StorageEvent('local-storage', { key }));
      }
    } catch (error) {
      console.warn(`[useLocalStorage] Failed to remove key "${key}":`, error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  // Cross-tab and same-tab synchronization
  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key && event.key !== key) return;

      try {
        const item = window.localStorage.getItem(key);
        const fallback = initialValue instanceof Function ? initialValue() : initialValue;
        const newValue = item !== null ? JSON.parse(item) : fallback;

        setStoredValue(prev => {
          return JSON.stringify(prev) === JSON.stringify(newValue) ? prev : newValue;
        });
      } catch (error) {
        const fallback = initialValue instanceof Function ? initialValue() : initialValue;
        setStoredValue(fallback);
      }
    };

    window.addEventListener('storage', handleStorage);
    window.addEventListener('local-storage', handleStorage);

    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('local-storage', handleStorage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return [storedValue, setValue, removeValue];
};
