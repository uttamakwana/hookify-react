import { useCallback, useRef, useState } from "react";

type TUseHistoryOptions = {
  capacity?: number;
};

type TUseHistoryReturn<T> = readonly [
  T,
  (value: T | ((prev: T) => T)) => void,
  {
    history: T[];
    pointer: number;
    back: () => void;
    forward: () => void;
    go: (index: number) => void;
  },
];
/**
 * Custom hook to manage state with history tracking, supporting undo/redo functionality.
 *
 * @template T - The type of the state value.
 * @param {T | (() => T)} defaultValue - Initial state value or a function returning the initial value.
 * @param {TUseHistoryOptions} [options] - Configuration options for history tracking.
 * @returns {[T, (value: T | ((prev: T) => T)) => void, { history: T[], pointer: number, back: () => void, forward: () => void, go: (index: number) => void }]}
 * Returns the current state, a setter function, and an object containing history, pointer, and navigation functions.
 *
 * @example
 * import { useHistory } from "hookify-react";
 *
 * export default function UseHistory() {
 *  const [value, setValue, { history, pointer, forward, go, back }] = useHistory([0]);
 *
 *  return <div>Play with the value</div>;
 * }
 */
export function useHistory<T>(
  defaultValue: T | (() => T),
  { capacity = 10 }: TUseHistoryOptions = {},
): TUseHistoryReturn<T> {
  const resolvedDefaultValue =
    typeof defaultValue === "function"
      ? (defaultValue as () => T)()
      : defaultValue;

  const [state, setState] = useState<T>(resolvedDefaultValue);
  const historyRef = useRef<T[]>([resolvedDefaultValue]);
  const pointerRef = useRef<number>(0);

  /**
   * Updates the state and manages history tracking.
   * Ensures history does not exceed the defined capacity.
   *
   * @param {T | ((prev: T) => T)} value - The new value or a function that updates the state.
   */
  const set = useCallback(
    (value: T | ((prev: T) => T)) => {
      setState((prev) => {
        const resolvedValue =
          typeof value === "function" ? (value as (prev: T) => T)(prev) : value;

        if (historyRef.current[pointerRef.current] !== resolvedValue) {
          if (pointerRef.current < historyRef.current.length - 1) {
            historyRef.current = historyRef.current.slice(
              0,
              pointerRef.current + 1,
            );
          }

          historyRef.current.push(resolvedValue);
          if (historyRef.current.length > capacity) {
            historyRef.current.shift();
          }
          pointerRef.current = historyRef.current.length - 1;
        }

        return resolvedValue;
      });
    },
    [capacity],
  );

  /** Moves one step back in the history if possible. */
  const back = useCallback(() => {
    if (pointerRef.current > 0) {
      pointerRef.current--;
      setState(historyRef.current[pointerRef.current]);
    }
  }, []);

  /** Moves one step forward in the history if possible. */
  const forward = useCallback(() => {
    if (pointerRef.current < historyRef.current.length - 1) {
      pointerRef.current++;
      setState(historyRef.current[pointerRef.current]);
    }
  }, []);

  /**
   * Moves to a specific index in the history if valid.
   *
   * @param {number} index - The target index in the history.
   */
  const go = useCallback((index: number) => {
    if (index >= 0 && index < historyRef.current.length) {
      pointerRef.current = index;
      setState(historyRef.current[pointerRef.current]);
    }
  }, []);

  return [
    state,
    set,
    {
      history: historyRef.current,
      pointer: pointerRef.current,
      back,
      forward,
      go,
    },
  ] as const;
}
