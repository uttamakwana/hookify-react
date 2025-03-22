import { useState, useEffect, useRef, useCallback } from "react";

type ScrollDirection = "up" | "down" | "left" | "right" | "none";

type ScrollInfo = {
  scrollX: number;
  scrollY: number;
  scrollDirection: ScrollDirection;
  isScrolling: boolean;
  scrollProgress: number; // Percentage scrolled (0-100)
};

type TUseScrollInfoReturn<T> = {
  ref: React.MutableRefObject<T | null>;
} & ScrollInfo;

/**
 * Custom hook to track scroll position, direction, and activity.
 *
 * @param {HTMLElement | null} targetElement - Optional element to track, defaults to window.
 * @returns {Object} - An object containing:
 * - `ref`: A ref that you can attach to any element
 * - `scrollX`: Horizontal scroll position
 * - `scrollY`: Vertical scroll position
 * - `scrollDirection`: A scroll direction (up, down, left, right, none)
 * - `isScrolling`: Boolean indicating whether an element is being scrolled or not
 * - `scrollProgress`: Percentage value of how much an element is scrolled
 *
 * @example
 * import { useScrollInfo } from "hookify-react";
 *
 * export default function UseScrollInfo() {
 *  const { ref, scrollX, scrollY, scrollDirection, isScrolling, scrollProgress } = useScrollInfo<HTMLDivElement>();
 *
 *  return <div ref={ref}>Get the scroll info of this div</div>
 * }
 */
export function useScrollInfo<
  T extends HTMLElement,
>(): TUseScrollInfoReturn<T> {
  const ref = useRef<T | null>(null);
  const [scrollData, setScrollData] = useState<ScrollInfo>({
    scrollX: 0,
    scrollY: 0,
    scrollDirection: "none",
    isScrolling: false,
    scrollProgress: 0,
  });

  const lastScrollY = useRef(0);
  const lastScrollX = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleScroll = useCallback(() => {
    const target = ref.current ?? document.documentElement;

    const newScrollX = target.scrollLeft ?? window.scrollX;
    const newScrollY = target.scrollTop ?? window.scrollY;
    const maxScrollHeight = target.scrollHeight - target.clientHeight;
    const scrollPercentage =
      maxScrollHeight > 0 ? (newScrollY / maxScrollHeight) * 100 : 0;

    const directionX =
      newScrollX > lastScrollX.current
        ? "right"
        : newScrollX < lastScrollX.current
          ? "left"
          : "none";
    const directionY =
      newScrollY > lastScrollY.current
        ? "down"
        : newScrollY < lastScrollY.current
          ? "up"
          : "none";

    setScrollData({
      scrollX: newScrollX,
      scrollY: newScrollY,
      scrollDirection: directionY !== "none" ? directionY : directionX,
      isScrolling: true,
      scrollProgress: scrollPercentage,
    });

    lastScrollX.current = newScrollX;
    lastScrollY.current = newScrollY;

    // Reset `isScrolling` after a delay
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    scrollTimeout.current = setTimeout(() => {
      setScrollData((prev) => ({ ...prev, isScrolling: false }));
    }, 150);
  }, []);

  useEffect(() => {
    const target = ref.current ?? window;
    target.addEventListener("scroll", handleScroll, { passive: true });

    return () => target.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return { ref, ...scrollData };
}
