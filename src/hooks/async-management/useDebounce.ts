import { useEffect } from "react";
import useTimeout from "./useTimeout.ts";

/**
 * A custom React hook that debounces the execution of a callback function.
 * It uses the `useTimeout` hook to delay the execution of the callback until after the specified delay.
 *
 * @param callback - The function to be debounced.
 * @param delay - The delay in milliseconds after which the callback should be executed.
 * @param deps - Additional dependencies for the useEffect hooks.
 *
 * @returns {void} - The function does not return any value.
 *
 * @example
 * ```typescript
 * import React from 'react';
 * import useDebounce from './useDebounce';
 *
 * const SearchInput: React.FC = () => {
 *   const [searchTerm, setSearchTerm] = React.useState('');
 *
 *   const getSearchedValueFromServer = React.useCallback(() => {
 *     // Perform search logic with searchTerm
 *   }, [searchTerm]);
 *
 *   useDebounce(getSearchedValueFromServer, 500, [searchTerm]);
 *
 *   return (
 *     <input
 *       type="text"
 *       value={searchTerm}
 *       onChange={(e) => setSearchTerm(e.target.value)}
 *     />
 *   );
 * };
 * ```
 */
export default function useDebounce(
  callback: () => void,
  delay: number,
  [...deps]: unknown[],
): void {
  const { reset, clear } = useTimeout(callback, delay);
  useEffect(reset, [...deps, reset]);
  useEffect(clear, [clear]);
}
