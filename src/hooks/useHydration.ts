'use client';

import { useState, useEffect } from 'react';

/**
 * Hook to safely handle hydration and prevent mismatches between server and client rendering
 * @returns boolean indicating whether hydration is complete
 */
export function useHydration(): boolean {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated;
}

/**
 * Hook to safely access browser APIs after hydration
 * @param getter Function that returns the value to get
 * @param fallback Fallback value to use before hydration
 * @returns The value from getter or fallback
 */
export function useSafeBrowserValue<T>(getter: () => T, fallback: T): T {
  const [value, setValue] = useState<T>(fallback);
  const isHydrated = useHydration();

  useEffect(() => {
    if (isHydrated) {
      setValue(getter());
    }
  }, [isHydrated, getter]);

  return value;
}

/**
 * Hook to safely access localStorage after hydration
 * @param key localStorage key
 * @param fallback Fallback value if key doesn't exist
 * @returns The value from localStorage or fallback
 */
export function useLocalStorage<T>(
  key: string,
  fallback: T,
): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(fallback);
  const isHydrated = useHydration();

  useEffect(() => {
    if (isHydrated) {
      const stored = localStorage.getItem(key);
      if (stored !== null) {
        try {
          setValue(JSON.parse(stored));
        } catch {
          setValue(fallback);
        }
      }
    }
  }, [key, fallback, isHydrated]);

  const setStoredValue = (newValue: T) => {
    setValue(newValue);
    if (isHydrated) {
      localStorage.setItem(key, JSON.stringify(newValue));
    }
  };

  return [value, setStoredValue];
}
