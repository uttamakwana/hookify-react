import { type Dispatch, type SetStateAction, useState as useReactState } from 'react';

/**
 * Custom hook that wraps the useState hook from React and provides additional type safety.
 *
 * @template T - The type of the state value.
 * @param initialValue - The initial state value or a function that returns the initial state value.
 * @returns A tuple containing the current state value and a dispatch function to update the state.
 *
 * @example
 * ```typescript
 * import useState from './useState';
 *
 * function MyComponent() {
 *   const [count, setCount] = useState(0);
 *
 *   return (
 *     <div>
 *       <p>You clicked {count} times</p>
 *       <button onClick={() => setCount(count + 1)}>
 *         Click me
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 */
export default function useState<T>(initialValue: T | (() => T)): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useReactState(initialValue);

  return [state, setState] as const;
}
