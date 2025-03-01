import { useState, useCallback } from "react";
import { useEventListener } from "./useEventListener.ts";

/**
 * Custom hook to track the size of the browser window.
 *
 * @returns An object containing the current `width` and `height` of the window.
 */
export function useWindowSize(): { width: number; height: number } {
  // Default values for SSR or environments without a `window` object.
  const isSSR = typeof window === "undefined";
  const [size, setSize] = useState({
    width: isSSR ? 0 : window.innerWidth,
    height: isSSR ? 0 : window.innerHeight,
  });

  // Throttle the resize handler for better performance.
  const resizeHandler = useCallback(() => {
    setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  // Attach the event listener using the custom `useEventListener` hook.
  useEventListener("resize", resizeHandler);

  return size;
}
