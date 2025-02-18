import { useRef } from 'react';

/**
 * A custom React hook that returns the previous value of a given state variable.
 *
 * @template T - The type of the state variable.
 * @param value - The current value of the state variable.
 * @returns The previous value of the state variable.
 *
 * @remarks
 * This hook uses React's useRef hook to maintain references to the current and previous values of the state variable.
 * When the value changes, the previous value is updated and the current value is stored for the next render.
 *
 * @example
 * const [count, setCount] = useState(0);
 * const prevCount = usePrevious(count);
 *
 * useEffect(() => {
 *   if (prevCount !== undefined) {
 *     console.log(`Previous count: ${prevCount}, Current count: ${count}`);
 *   }
 * }, [count, prevCount]);
 */
export default function usePrevious<T>(value: T) {
  const currentValueRef = useRef<T>(value);
  const previousValueRef = useRef<T>();

  if (currentValueRef.current !== value) {
    previousValueRef.current = currentValueRef.current;
    currentValueRef.current = value;
  }

  return previousValueRef.current;
}
