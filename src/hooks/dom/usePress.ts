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
 *  import { usePress } from "hookify-react";
 *
 *  export default function UsePressExample() {
 *    const { ref, isPressed } = usePress<HTMLButtonElement>();
 *
 *    return (
 *      <button ref={ref} style={{ padding: "10px", fontSize: "16px" }}>
 *        {isPressed ? "Wow that feels good! 😁" : "Please press me! 😥"}
 *      </button>
 *    );
 *  }
 */
export function usePress<T extends HTMLElement>(): TUsePressReturn<T> {
  const [isPressed, setIsPressed] = useState(false);
  const ref = useRef<T>(null);

  useEventListener("mousedown", () => setIsPressed(true), ref);
  useEventListener("mouseup", () => setIsPressed(false), ref);

  return { isPressed, ref };
}
