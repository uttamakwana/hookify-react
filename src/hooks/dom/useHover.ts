import { useRef, useState, useCallback } from "react";
import { useEventListener } from "./useEventListener.ts";

type TUseHoverReturn<T> = {
  ref: React.MutableRefObject<T | null>;
  isHovered: boolean;
};

/**
 * A custom hook to track hover state on an element.
 *
 * @returns {Object} An object containing:
 * - `ref`: A ref that you can attach to any element
 * - `isHovered`: Boolean indicating an element is being hovered or not
 *
 * @example
 * import { useHover } from "hookify-react";
 *
 * export default function UseHover() {
 *   const { ref, isHovered } = useHover<HTMLDivElement>();
 *
 *   return (
 *     <div ref={ref} style={{ background: isHovered ? "blue" : "gray" }}>
 *       Hover over me!
 *     </div>
 *   );
 * }
 */
export function useHover<T extends HTMLElement>(): TUseHoverReturn<T> {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<T | null>(null);

  const handleHover = useCallback(
    (event: MouseEvent) => setIsHovered(event.type === "mouseenter"),
    [],
  );

  useEventListener("mouseenter", handleHover, ref);
  useEventListener("mouseleave", handleHover, ref);

  return { ref, isHovered };
}
