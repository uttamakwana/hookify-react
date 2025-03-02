import { useEffect, useRef, useState } from "react";

type TUseOnScreenReturn<T> = {
  ref: React.MutableRefObject<T | null>;
  isVisible: boolean;
};
/**
 * Custom hook to check if an element is visible within the viewport.
 *
 * @param element - A React ref object pointing to the target element.
 * @param rootMargin - Margin around the root. Can have values similar to CSS margin properties.
 * @returns `true` if the element is visible on the screen, otherwise `false`.
 *
 * @example
 * import { useOnScreen } from "hooks-for-react";
 *
 * export default function UseOnScreen() {
 *  const { ref, isVisible } = useOnScreen();
 *
 * return (
 *     <div ref={ref} style={{ height: "200px", backgroundColor: isVisible ? "lightgreen" : "lightcoral" }}>
 *       {isVisible ? "I'm visible! 🎉" : "Not in view 👀"}
 *     </div>
 *   );
 * }
 */
export function useOnScreen<T extends HTMLElement>(
  rootMargin: string = "0px",
): TUseOnScreenReturn<T> {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin },
    );

    observer.observe(target);

    return () => observer.unobserve(target);
  }, [ref, rootMargin]);

  return { ref, isVisible };
}
