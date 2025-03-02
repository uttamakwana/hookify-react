import { useRef, useEffect } from "react";

/**
 * A custom hook for adding event listeners to elements efficiently.
 *
 * @param eventType - The type of event to listen for (e.g., 'click', 'keydown').
 * @param callback - The function to execute when the event fires.
 * @param elementRef - A React ref pointing to the target element (defaults to `window`).
 * @param options - Additional options for `addEventListener`.
 *
 * @example
 * import { useEventListener } from "hooks-for-react";
 *
 * export default function UseEventListener() {
 *   const buttonRef = useRef<HTMLButtonElement>(null);
 *
 *   useEventListener("click", () => alert("Button clicked!"), buttonRef);
 *
 *   return <button ref={buttonRef}>Click Me</button>;
 * }
 */
export function useEventListener<K extends keyof WindowEventMap>(
  eventType: K,
  callback: (event: WindowEventMap[K]) => void,
  elementRef?: React.RefObject<HTMLElement | Window | Document>,
  options?: boolean | AddEventListenerOptions,
) {
  // Store the latest callback in a ref to avoid re-creating the event handler
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const target = elementRef?.current ?? window;

    if (!(target && target.addEventListener)) return;

    const handleEvent = (event: WindowEventMap[K]) =>
      callbackRef.current(event);

    target.addEventListener(eventType, handleEvent as EventListener, options);

    return () => {
      target.removeEventListener(
        eventType,
        handleEvent as EventListener,
        options,
      );
    };
  }, [eventType, elementRef, options]);
}
