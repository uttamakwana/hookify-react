import { RefObject, useEffect, useState } from 'react';

/**
 * Custom hook to check if an element is visible within the viewport.
 *
 * @param element - A React ref object pointing to the target element.
 * @param rootMargin - Margin around the root. Can have values similar to CSS margin properties.
 * @returns `true` if the element is visible on the screen, otherwise `false`.
 */
export function useOnScreen(
 element: RefObject<Element>,
 rootMargin: string = '0px'
): boolean {
 const [isVisible, setIsVisible] = useState(false);

 useEffect(() => {
  if (!element.current) return;

  // Ensure IntersectionObserver is supported
  if (!('IntersectionObserver' in window)) {
   console.warn('IntersectionObserver is not supported in this browser.');
   return;
  }

  const observer = new IntersectionObserver(
   ([entry]) => {
    setIsVisible(entry.isIntersecting);
   },
   { rootMargin }
  );

  const target = element.current;
  observer.observe(target);

  return () => {
   observer.disconnect(); // Clean up observer
  };
 }, [element, rootMargin]);

 return isVisible;
}
