import { useState, useCallback, useLayoutEffect } from "react";

type WindowSize = { width: number; height: number };
type TUseWindowSizeReturn = WindowSize;

/**
 * Custom hook to track the size of the browser window in real-time.
 *
 * @returns {Object} An object containing:
 * - `width`: The current width of the window.
 * - `height`: The current height of the window.
 *
 * @example
 * import { useWindowSize } from "hookify-react";
 *
 * export default function UseWindowSize() {
 *  const { width, height } = useWindowSize();
 *  console.log(`Window Size: ${width} x ${height}`);
 *
 *  return <div>Get a window size</div>
 * }
 */
export function useWindowSize(): TUseWindowSizeReturn {
  const isSSR = typeof window === "undefined";

  // Initialize state with actual window size (if available)
  const [size, setSize] = useState<WindowSize>({
    width: isSSR ? 0 : window.innerWidth,
    height: isSSR ? 0 : window.innerHeight,
  });

  // Use useCallback to keep a stable reference
  const updateSize = useCallback(() => {
    setSize({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  // Handle updates efficiently with `useLayoutEffect`
  useLayoutEffect(() => {
    if (isSSR) return;

    updateSize(); // Ensure size is accurate after hydration

    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, [isSSR, updateSize]);

  return size;
}
