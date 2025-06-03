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
 * export default function UseHoverExample() {
 *   const { ref, isHovered } = useHover();
 *
 *   return (
 *     <div
 *       ref={ref}
 *       style={{
 *         width: "200px",
 *         height: "100px",
 *         display: "flex",
 *         alignItems: "center",
 *         justifyContent: "center",
 *         background: isHovered ? "blue" : "gray",
 *         color: "white",
 *         fontSize: "18px",
 *         borderRadius: "8px",
 *         transition: "background 0.3s ease",
 *       }}
 *     >
 *       {isHovered ? "Hovered! 🎯" : "Hover over me!"}
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
