import { useState } from 'react';

/**
 * A custom React hook that manages a boolean state and provides a function to toggle it and make it true or false whenever needed.
 *
 * @param initialValue - The initial value of the boolean state.
 * @returns An array containing the current state and a function to toggle it.
 *
 * @example
 * ```typescript
 * import React from 'react';
 * import useToggle from './useToggle';
 *
 * function ToggleComponent() {
 *   const [isToggled, toggle] = useToggle(false);
 *
 *   return (
 *     <div>
 *       <button onClick={toggle}>Toggle</button>
 *       <button onClick={() => toggle(true)}>Toggle to true</button>
 *       <button onClick={() => toggle(false)}>Toggle to false</button>
 *       <p>Toggle is: {isToggled ? 'On' : 'Off'}</p>
 *     </div>
 *   );
 * }
 * ```
 */
export default function useToggle(initialValue: boolean) {
  const [state, setState] = useState(initialValue);

  function setValue(value?: boolean) {
    setState(prev => typeof value === "boolean" ? value : !prev);
  }

  return [state, setValue] as const;
}
