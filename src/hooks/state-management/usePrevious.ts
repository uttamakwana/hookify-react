import { useEffect, useRef } from "react";

/**
 * Custom React hook to store and retrieve the previous value of a given state or prop.
 *
 * @template T - The type of the tracked value.
 * @param value - The current value to track.
 * @returns The previous value before the last update, or `null` if no previous value exists.
 *
 * @example
 * import { usePrevious } from "hooks-for-react";
 * const [count, setCount] = useState(0);
 * const prevCount = usePrevious(count);
 *
 * useEffect(() => {
 *   console.log(`Previous count: ${prevCount}, Current count: ${count}`);
 * }, [count]);
 *
 * return (
 *  <div>
 *    <button onClick={() => setCount(prev => prev + 1)}>+1</button>
 *    <span>Previous count value: {prevCount}</span>
 *  </div>
 * );
 */
export function usePrevious<T>(value: T): T | null {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
