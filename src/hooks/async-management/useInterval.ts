import { useEffect, useRef } from "react";

/**
 * A custom hook to execute a callback at a specified interval.
 *
 * @param {() => void} callback - The function to execute at each interval.
 * @param {number} [interval=1000] - The time in milliseconds between executions (defaults to 1000ms).
 * @returns {{ clear: () => void }} - A function to stop the interval.
 *
 * @example
 *  import { useState } from "react";
 *  import { useInterval } from "hookify-react";
 *
 *  export default function UseIntervalExample() {
 *    const [count, setCount] = useState(0);
 *    const { clear } = useInterval(() => setCount((prev) => prev + 1), 1000);
 *
 *    return (
 *      <div>
 *        <p>Counter: {count}</p>
 *        <button onClick={clear}>Stop Timer</button>
 *      </div>
 *    );
 *  }
 */
export function useInterval(
  callback: () => void,
  interval: number = 1000,
): { clear: () => void } {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Clears the interval and resets the reference.
   */
  const clear = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null; // Ensure it's properly reset
    }
  };

  useEffect(() => {
    intervalRef.current = setInterval(callback, interval);

    return clear; // Cleanup function to clear the interval on unmount
  }, [callback, interval]);

  return { clear };
}
