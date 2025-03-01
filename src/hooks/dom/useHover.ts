import { useRef, useState } from "react";
import { useEventListener } from "./useEventListener.ts";

/**
 * A custom hook to check whether the element is hovered or not
 */
export default function useHover<T extends HTMLElement>() {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<T | null>(null);

  useEventListener(
    "mouseenter",
    () => {
      setIsHovered(true);
    },
    ref,
  );
  useEventListener(
    "mouseleave",
    () => {
      setIsHovered(false);
    },
    ref,
  );
  return { ref, isHovered };
}
