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
 * import { useState } from "react";

 * export default function UseAdvancedEffectExample() {
 *  const [count, setCount] = useState(0);
 *  const [otherCount, setOtherCount] = useState(0);
 *
 *  useAdvancedEffect(() => {
 *    console.log("Effect triggered:", count);
 *  }, [count]);
 *
 *  return (
 *    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
 *      <h2>useAdvancedEffect Hook Example</h2>
 *      <p>Count: <strong>{count}</strong></p>
 *      <p>Other count: <strong>{otherCount}</strong></p>
 *      <button onClick={() => setCount(prev => prev + 1)}>Increment</button>
 *      <button onClick={() => setOtherCount(prev => prev + 1)}>
 *        Increment other count
 *      </button>
 *      <p>Check the console for effect triggers.</p>
 *    </div>
 *  );
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
