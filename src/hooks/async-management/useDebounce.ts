import { useEffect } from "react";
import { useTimeout } from "./useTimeout.ts"; // Ensure this is correctly imported

/**
 * Custom hook that delays the execution of a callback function
 * until after a specified delay has elapsed since the last change in dependencies.
 *
 * @param {() => void} callback - The function to debounce.
 * @param {number} delay - The delay in milliseconds before executing the callback.
 * @param {unknown[]} deps - The dependencies that trigger the debounce effect.
 *
 * @example
 * // Usage example in a component:
 * function SearchComponent() {
 *   const [query, setQuery] = useState("");
 *
 *   useDebounce(() => {
 *     console.log("Searching for:", query);
 *   }, 500, [query]);
 *
 *   return (
 *     <input
 *       type="text"
 *       placeholder="Search..."
 *       value={query}
 *       onChange={(e) => setQuery(e.target.value)}
 *     />
 *   );
 * }
 */
export function useDebounce(
  callback: () => void,
  delay: number,
  deps: unknown[],
): void {
  const { reset, clear } = useTimeout(callback, delay);

  useEffect(reset, [...deps, reset]); // Resets the timeout when dependencies change
  useEffect(clear, [clear]); // Clears the timeout on unmount
}
