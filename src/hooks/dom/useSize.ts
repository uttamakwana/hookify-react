import { useEffect, useRef, useState, useCallback } from "react";

type TSize = {
  width: number;
  height: number;
  top: number;
  left: number;
  bottom: number;
  right: number;
};

type TUseSizeReturn<T> = {
  ref: React.MutableRefObject<T | null>;
  size: TSize | null;
};
/**
 * Custom hook to track the size of an HTML element in real-time.
 *
 * @template T - The HTMLElement type.
 * @returns {Object} An object containing:
 * - `ref`: A ref to attach to the target element.
 * - `size`: The element's current size (`width`, `height`, `top`, `left`, `bottom`, `right`).
 *
 * @example
 * import { useSize } from "hookify-react";
 *
 * export default function UseSize() {
 *  const { ref, size } = useSize<HTMLDivElement>();
 *
 *  return <div ref={ref}>Get size of this element</div>
 * }
 * ```
 */
export function useSize<T extends HTMLElement>(): TUseSizeReturn<T> {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState<TSize | null>(null);

  const updateSize = useCallback((entries: ResizeObserverEntry[]) => {
    const entry = entries[0];
    if (!entry) return;

    const { width, height, top, left, bottom, right } = entry.contentRect;
    setSize({ width, height, top, left, bottom, right });
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new ResizeObserver(updateSize);
    observer.observe(element);

    return () => observer.disconnect();
  }, [updateSize]);

  return { ref, size };
}
