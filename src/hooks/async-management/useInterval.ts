import { useEffect, useRef } from "react";

/**
 * A custom hook to execuate a callback after a specific interval
 *
 * @param callback: A callback to exectue
 * @param interval: time in ms after a callback will execute (default to 1000)
 *
 */
export default function useInterval(
  callback: () => void,
  interval: number = 1000,
) {
  const intervalRef = useRef(0);
  console.log(intervalRef);

  const clear = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      // intervalRef.current = undefined
    }
  };

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      callback();
    }, interval);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [callback, interval]);

  return { clear };
}
