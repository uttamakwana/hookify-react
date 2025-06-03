import { useEffect, useRef } from "react";

/**
 * Custom React hook to store and retrieve the previous value of a given state or prop.
 *
 * @template T - The type of the tracked value.
 * @param value - The current value to track.
 * @returns The previous value before the last update, or `null` if no previous value exists.
 *
 * @example
 *  import { useState } from "react";
 *  import { usePrevious } from "hookify-react";
 *
 *  export default function UsePreviousExample() {
 *    const [count, setCount] = useState(0);
 *    const prevCount = usePrevious(count);
 *
 *    console.log(`Previous count: ${prevCount}, Current count: ${count}`);
 *
 *    return (
 *      <div>
 *        <button onClick={() => setCount(prev => prev + 1)}>+1</button>
 *        <p>Current count value: <strong>{count}</strong></p>
 *        <p>Previous count value: <strong>{prevCount}</strong></p>
 *      </div>
 *    );
 *  }
 */
export function usePrevious<T>(value: T): T | null {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
