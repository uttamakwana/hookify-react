import { useRef, useEffect } from "react";

/**
 * Custom hook to add and manage event listeners efficiently.
 *
 * @param eventType - Type of the event to listen for (e.g., 'click', 'keydown').
 * @param callback - Function to be called when the event is triggered.
 * @param element - Target element to attach the event listener (default is `window`).
 * @param options - Extra add event listener options.
 */
export function useEventListener<K extends keyof WindowEventMap>(
  eventType: K,
  callback: (event: WindowEventMap[K]) => void,
  elementRef?: React.MutableRefObject<HTMLElement | null>,
  options?: boolean | AddEventListenerOptions,
) {
  // Store the latest callback in a ref to prevent re-creating the event listener on each render.
  const callbackRef = useRef(callback);

  // Update the ref with the latest callback whenever it changes.
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Add and remove the event listener.
  useEffect(() => {
    let element: HTMLElement | Window = window;
    if (elementRef?.current != null) {
      element = elementRef.current;
    }
    // Ensure the element supports `addEventListener` to avoid runtime errors.
    if (!element || !element.addEventListener) {
      console.warn(
        `Provided element does not support event listeners: ${element}`,
      );
      return;
    }

    // Create an event handler that calls the latest callback.
    const handleEvent = (event: WindowEventMap[K]) => {
      callbackRef.current(event);
    };

    // Attach the event listener with type casting to EventListener.
    element.addEventListener(eventType, handleEvent as EventListener, options);

    // Cleanup the event listener on component unmount or dependency change.
    return () => {
      element.removeEventListener(
        eventType,
        handleEvent as EventListener,
        options,
      );
    };
  }, [eventType, elementRef, options]);
}
