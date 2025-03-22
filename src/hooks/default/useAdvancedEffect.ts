import { DependencyList, EffectCallback, useEffect, useRef } from "react";

type TUseAdvancedEffectReturn = void;

/**
 * A custom React hook that enhances `useEffect` with advanced dependency comparison.
 *
 * - It **skips execution on the initial render**.
 * - It **executes the effect only if the dependencies change** between renders.
 * - It prevents unnecessary re-executions when dependencies remain unchanged.
 *
 * @param {EffectCallback} effect - The effect function to execute.
 * @param {DependencyList} deps - An array of dependencies that determine when the effect runs.
 *
 * @example
 * import { useAdvancedEffect } from "hookify-react";
 *
 * export default function UseAdvancedEffect() {
 *   const [count, setCount] = useState(0);
 *
 *   useAdvancedEffect(() => {
 *     console.log("Effect triggered:", count);
 *   }, [count]);
 *
 *   return <button onClick={() => setCount(count + 1)}>Increment</button>;
 * }
 */
export function useAdvancedEffect(
  effect: EffectCallback,
  deps: DependencyList,
): TUseAdvancedEffectReturn {
  const firstRender = useRef(true);
  const previousDepsRef = useRef<DependencyList | undefined>(undefined);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      previousDepsRef.current = deps;
      return;
    }

    const hasDepsChanged = deps.some(
      (dep, i) => dep !== previousDepsRef.current?.[i],
    );

    if (hasDepsChanged) {
      previousDepsRef.current = deps;
      return effect();
    }
  }, [deps, effect]); // Ensure effect runs only when dependencies change
}
