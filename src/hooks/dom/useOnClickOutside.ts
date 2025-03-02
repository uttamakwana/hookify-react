import { useCallback, useRef } from "react";
import { useEventListener } from "./useEventListener.ts";

type TUseClickOutsideReturn<T> = { ref: React.MutableRefObject<T | null> };

/**
 * A custom React hook that listens for clicks outside of a specified element and triggers a callback function.
 *
 * @param elementRef - A React ref object pointing to the target element.
 * @param callback - A function to be executed when a click occurs outside the element.
 *
 * @return {Object} An object containing:
 * - `ref`: A ref that you can attach to any element
 *
 * @example
 * import { useClickOutside } from "hooks-for-react";
 *
 * export default function UseClickOutside() {
 *   const { ref } = useClickOutside<HTMLDivElement>(() => console.log("Clicked outside!"));
 *
 *   return <div ref={ref}>Click outside of this div to trigger the callback.</div>;
 * }
 */
export default function useClickOutside<T extends HTMLElement>(
  callback: () => void,
): TUseClickOutsideReturn<T> {
  const ref = useRef<T | null>(null);
  const handleClick = useCallback(
    (event: MouseEvent | TouchEvent) => {
      if (!ref.current?.contains(event.target as Node)) {
        callback();
      }
    },
    [callback, ref],
  );

  useEventListener("mousedown", handleClick, { current: document.body });
  useEventListener("touchstart", handleClick, { current: document.body });

  return { ref };
}
