import { type RefObject } from "react";
import { useEventListener } from "./useEventListener.ts";
/**
 * A custom React hook that listens for clicks outside of a specified element and triggers a callback function.
 *
 * @param elementRef - A React ref object that points to the DOM element to listen for clicks outside of.
 * @param callback - A function to be called when a click occurs outside of the specified element.
 *
 * @returns {void}
 *
 * @example
 * ```typescript
 * import React from 'react';
 * import useClickOutside from './useClickOutside';
 *
 * const MyComponent: React.FC = () => {
 *   const ref = React.useRef<HTMLDivElement>(null);
 *   const handleClickOutside = () => {
 *     console.log('Clicked outside!');
 *   };
 *
 *   useClickOutside(ref, handleClickOutside);
 *
 *   return (
 *     <div ref={ref}>
 *       Click outside of this div to trigger the callback.
 *     </div>
 *   );
 * };
 * ```
 */
export default function useClickOutside(
  elementRef: RefObject<HTMLElement>,
  callback: () => void,
): void {
  function handleClick(e: MouseEvent | TouchEvent) {
    if (!elementRef.current?.contains(e.target as Node)) {
      callback();
    }
  }

  useEventListener("mousedown", handleClick);
  useEventListener("touchstart", handleClick);
}
