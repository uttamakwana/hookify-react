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
 *   import { useOnScreen } from "hookify-react";
 *
 *   export default function UseOnScreenExample() {
 *     const { ref, isVisible } = useOnScreen("-100px");
 *
 *     return (
 *       <div>
 *         <div style={{ height: "100svh" }}>Scroll down to see the box</div>
 *         <div
 *           ref={ref}
 *           style={{
 *             height: "400px",
 *             backgroundColor: isVisible ? "lightgreen" : "lightcoral",
 *             display: "flex",
 *             alignItems: "center",
 *             justifyContent: "center",
 *             fontSize: "20px",
 *           }}
 *         >
 *           {isVisible ? "I'm visible! 🎉" : "Not in view 👀"}
 *         </div>
 *       </div>
 *     );
 *   }
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
