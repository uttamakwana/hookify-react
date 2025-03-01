import {
  DependencyList,
  EffectCallback,
  useEffect as useReactEffect,
} from "react";

/**
 * A custom hook that provides the same functionality as the React `useEffect` hook.
 * This custom hook is used to perform side effects in functional components.
 *
 * @param effect - A function containing the side effect logic.
 * This function will be executed after every render, including the initial render.
 *
 * @param deps - An optional array of dependencies.
 * If provided, the effect will only be re-executed if the values in the dependency array change.
 * If not provided, the effect will be re-executed on every render.
 *
 * @returns - The same return value as the React `useEffect` hook.
 * This return value is currently not used, but it may be used in the future.
 */
export default function useEffect(
  effect: EffectCallback,
  deps?: DependencyList,
) {
  return useReactEffect(effect, deps ? deps : undefined);
}
