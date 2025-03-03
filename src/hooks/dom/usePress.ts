import React, { useRef, useState } from "react";
import { useEventListener } from "./useEventListener.ts";

type TUsePressReturn<T> = {
  ref: React.MutableRefObject<T | null>;
  isPressed: boolean;
};

/**
 * Custom hook to check if an element is being pressed or not
 *
 * @returns {Object} An object containing:
 * - `ref`: A ref that you can attach to any element
 * - `isPressed`: Boolean indicating whether an element is being pressed or not
 *
 * @example
 * import { usePress } from "hooks-for-react";
 *
 * export default function UsePress() {
 *  const { ref, isPressed } = usePress<HTMLButtonElement>();
 *
 * return <button ref={ref}>{isPressed ? "Wow that feels good😁!" : "Please press me!😥"}</button>
 * }
 */
export function usePress<T extends HTMLElement>(): TUsePressReturn<T> {
  const [isPressed, setIsPressed] = useState(false);
  const ref = useRef<T>(null);

  useEventListener("mousedown", () => setIsPressed(true), ref);
  useEventListener("mouseup", () => setIsPressed(false), ref);

  return { isPressed, ref };
}
