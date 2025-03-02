import { DependencyList, EffectCallback, useEffect, useRef } from "react";

type TUseUpdatedEffectReturn = void;

/**
 * A custom hook that only executes the effect when dependencies change.
 *
 * @param {EffectCallback} effect - The effect function to execute.
 * @param {DependencyList} deps - An array of dependencies to track changes.
 *
 * @example
 * import { useUpdatedEffect } from "hooks-for-react";
 *
 * export default function useUpdatedEffect() {
 *   useUpdatedEffect(() => {
 *     console.log("Effect triggered due to dependency change.");
 *   }, [someState]);
 *
 *   return <div>Check the console!</div>;
 * }
 */

export default function useUpdatedEffect(
  effect: EffectCallback,
  deps: DependencyList,
): TUseUpdatedEffectReturn {
  const previousDepsRef = useRef<DependencyList | undefined>(undefined);

  useEffect(() => {
    previousDepsRef.current = deps;

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
