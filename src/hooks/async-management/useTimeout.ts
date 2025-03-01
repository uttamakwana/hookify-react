import { useCallback, useEffect, useRef } from "react";

/**
 * Custom hook for managing a timeout.
 *
 * @param {() => void} callback - The function to execute when the timeout completes.
 * @param {number} delay - The delay in milliseconds for the timeout.
 * @returns {{ set: () => void, clear: () => void, reset: () => void }} - Functions to control the timeout.
 */
export default function useTimeout(
  callback: () => void,
  delay: number,
): { set: () => void; clear: () => void; reset: () => void } {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef<number | undefined>();

  /**
   * Sets the timeout with the provided delay.
   */
  const set = useCallback(() => {
    timeoutRef.current = window.setTimeout(() => {
      callbackRef.current();
    }, delay);
  }, [delay]);

  /**
   * Clears the current timeout.
   */
  const clear = useCallback(() => {
    if (timeoutRef.current !== undefined) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }
  }, []);

  /**
   * Resets the timeout by clearing the current one and setting a new one.
   */
  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  /**
   * Sets the timeout on mount and cleans up on unmount.
   */
  useEffect(() => {
    set();
    return clear;
  }, [set, clear]);

  /**
   * Updates the callback reference whenever the callback changes.
   */
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return { set, clear, reset };
}
