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
 *   import { useClickOutside } from "hookify-react";
 *   import { useState } from "react";
 *
 *   export default function ClickOutsideExample() {
 *     const [isOpen, setIsOpen] = useState(true);
 *     const { ref } = useClickOutside<HTMLDivElement>(() => setIsOpen(false));
 *
 *     return (
 *       <div>
 *         <button onClick={() => setIsOpen(true)}>Open Modal</button>
 *         {isOpen && (
 *           <div ref={ref} style={{ padding: "20px", border: "1px solid black", width: "200px" }}>
 *             Click outside of this box to close it.
 *         </div>
 *       )}
 *     </div>
 * );
 * }
 */
export function useClickOutside<T extends HTMLElement>(
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
