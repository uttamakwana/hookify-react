import { useCallback, useRef, useState } from "react";

type TUseHistoryOptions = {
  capacity: number;
};

export default function useHistory<T>(
  defaultValue: T | (() => T),
  { capacity }: TUseHistoryOptions = { capacity: 10 },
) {
  const resolvedDefaultValue =
    typeof defaultValue === "function"
      ? (defaultValue as () => T)()
      : defaultValue;
  const [state, setState] = useState<T>(defaultValue);
  const historyRef = useRef<Array<T>>([resolvedDefaultValue]);
  const pointerRef = useRef<number>(0);

  const set = useCallback(
    (v: T | ((prev: T) => T)) => {
      const resolvedValue =
        typeof v === "function" ? (v as (prev: T) => T)(state) : v;
      if (historyRef.current[pointerRef.current] !== resolvedValue) {
        if (pointerRef.current < historyRef.current.length - 1) {
          historyRef.current.splice(pointerRef.current + 1);
        }
        historyRef.current.push(resolvedValue);

        while (historyRef.current.length > capacity) {
          historyRef.current.shift();
        }
        pointerRef.current = historyRef.current.length - 1;
      }
      setState(resolvedValue);
    },
    [state, capacity],
  );

  const back = useCallback(() => {
    if (pointerRef.current <= 0) return;
    pointerRef.current--;
    setState(historyRef.current[pointerRef.current]);
  }, []);

  const forward = useCallback(() => {
    if (pointerRef.current >= historyRef.current.length - 1) return;
    pointerRef.current++;
    setState(historyRef.current[pointerRef.current]);
  }, []);

  const go = useCallback((index: number) => {
    if (index < 0 || index >= historyRef.current.length - 1) return;
    pointerRef.current = index;
    setState(historyRef.current[pointerRef.current]);
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
