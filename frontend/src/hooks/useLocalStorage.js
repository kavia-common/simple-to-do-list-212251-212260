import { useEffect, useState } from "react";

/**
 * Safely parse a JSON value.
 * @param {string} raw
 * @param {any} fallback
 * @returns {any}
 */
function safeJsonParse(raw, fallback) {
  try {
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

// PUBLIC_INTERFACE
export function useLocalStorage(key, initialValue) {
  /** React hook that stores state in localStorage (no backend).
   *
   * @param {string} key localStorage key
   * @param {any|function():any} initialValue initial value (or lazy initializer)
   * @returns {[any, function]} tuple of [value, setValue]
   */
  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") return initialValue;
    const existing = window.localStorage.getItem(key);
    if (existing === null) {
      return typeof initialValue === "function" ? initialValue() : initialValue;
    }
    return safeJsonParse(
      existing,
      typeof initialValue === "function" ? initialValue() : initialValue
    );
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // If storage is full or blocked, fail silently; app still works in-memory.
    }
  }, [key, value]);

  return [value, setValue];
}
