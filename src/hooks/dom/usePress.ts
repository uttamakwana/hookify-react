import { useRef, useState } from "react";
import { useEventListener } from "./useEventListener.ts";

export default function usePress<T extends HTMLElement>() {
  const [isPressed, setIsPressed] = useState(false);
  const ref = useRef<T>(null);

  useEventListener("mousedown", () => setIsPressed(true), ref);
  useEventListener("mouseup", () => setIsPressed(false), ref);

  return { isPressed, ref };
}
