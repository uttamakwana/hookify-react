import { DependencyList, EffectCallback, useEffect, useRef } from "react";

/**
 * A custom React hook that enhances the `useEffect` hook by providing advanced dependency comparison.
 * This hook is designed to prevent execution of effect on the first render and also unnecessary re-executions of the effect function when the dependencies remain unchanged between renders.
 *
 * @param effect - The effect function to be executed.
 * @param deps - An array of dependencies that the effect function depends on.
 *
 * @returns {void}
 */
export default function useAdvancedEffect(
  effect: EffectCallback,
  deps: DependencyList,
): void {
  const firstTimeRenderRef = useRef(true);
  const previousDepsRef = useRef<DependencyList | undefined>(undefined);

  useEffect(() => {
    // Check if this is the first render
    if (firstTimeRenderRef.current) {
      firstTimeRenderRef.current = false;
      previousDepsRef.current = deps;

      return;
    }

    // Compare previous and current dependencies to detect changes
    const isDepsChanged = deps.some(
      (dep, i) => dep !== previousDepsRef.current?.[i],
    );

    if (isDepsChanged) {
      // Update the previous dependencies reference
      previousDepsRef.current = deps;
      // Call the effect function
      return effect();
    }
  }, [effect, deps]);
}
