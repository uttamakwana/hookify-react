import { Dispatch, SetStateAction, useRef, useState } from "react";

export type TUseArrayMethods<T> = {
  push: (value: T) => number;
  pop: () => T | undefined;
  shift: () => T | undefined;
  unshift: (value: T) => number;
  removeByIndex: (index: number) => void;
  removeByValue: (value: T) => void;
  clear: () => void;
  replace: (newArray: T[]) => void;
  reset: () => void;
  filter: (predicate: (value: T, index: number, array: T[]) => boolean) => void;
  updateByIndex: (index: number, value: T) => void;
  updateByValue: (prevValue: T, newValue: T) => void;
};

type TUseArrayReturn<T> = readonly [
  T[],
  Dispatch<SetStateAction<T[]>>,
  TUseArrayMethods<T>,
];

/**
 * A custom React hook for managing arrays. It provides utility functions for common operations
 * like adding, removing, updating, and resetting array elements.
 *
 * @template T - The type of elements in the array.
 * @param initialValue - The initial value of the array.
 * @returns An array containing the state, setState and utility functions to manipulate it.
 * - `push`: Adds a value to the end of the array.
 * - `pop`: Removes and returns the last element of the array.
 * - `unshift`: Adds a value to the beginning of the array.
 * - `shift`: Removes and returns the first element of the array.
 * - `removeByIndex`: Removes the first occurrence of a specified index from the array.
 * - `removeByValue`: Removes the first occurrence of a specified value from the array.
 * - `clear`: Clears all elements from the array.
 * - `replace`: Replaces the current array with a new array.
 * - `reset`: Resets the array to its initial value.
 * - `filter`: Filters the array based on a predicate function and updates the state.
 * - `updateByIndex`: Updates the value of an element at a specific index.
 * - `updateByValue`: Updates the first occurrence of a specific value with a new value.
 *
 * @example
 * import { useArray } from "hookify-react";
 *
 * export default function UseArray() {
 *  const [data, setData, { push, pop, clear, filter }] = useArray<{ name: string, age: number }>();
 *
 *  return <div>Render and perform the action over here</div>
 * }
 */
export function useArray<T>(initialValue: T[]): TUseArrayReturn<T> {
  // State to hold the array
  const [state, setState] = useState<T[]>(initialValue);

  // Ref to store the initial array value for resetting
  const initialValueRef = useRef<T[]>(initialValue);

  /**
   * Adds a value to the end of the array.
   * @param value - The value to add.
   */
  const push = (value: T) => {
    setState((prev) => [...prev, value]);
    return state.length + 1;
  };

  /**
   * Removes and returns the last element of the array.
   * @returns The removed element, or undefined if the array is empty.
   */
  const pop = (): T | undefined => {
    const lastElement = state[state.length - 1];
    setState((prev) => prev.slice(0, -1));
    return lastElement;
  };

  /**
   * Adds a value to the beginning of the array.
   * @param value - The value to add.
   */
  const unshift = (value: T) => {
    setState((prev) => [value, ...prev]);
    return state.length + 1;
  };

  /**
   * Removes and returns the first element of the array.
   * @returns The removed element, or undefined if the array is empty.
   */
  const shift = (): T | undefined => {
    const firstElement = state[0];
    setState((prev) => prev.slice(1));
    return firstElement;
  };

  /**
   * Removes an element from the array by index.
   * @param index - The index of the element to remove.
   */
  const removeByIndex = (index: number) => {
    setState((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
  };

  /**
   * Removes the first occurrence of a specified value from the array.
   * @param value - The value to remove.
   */
  const removeByValue = (value: T) => {
    setState((prev) =>
      prev.filter((item) => {
        if (typeof value === "object") {
          return JSON.stringify(item) !== JSON.stringify(value);
        } else {
          return item !== value;
        }
      }),
    );
  };

  /**
   * Clears all elements from the array.
   */
  const clear = () => {
    setState([]);
  };

  /**
   * Replaces the current array with a new array.
   * @param newArray - The new array to replace with.
   */
  const replace = (newArray: T[]) => {
    setState(newArray);
  };

  /**
   * Resets the array to its initial value.
   */
  const reset = () => {
    setState(initialValueRef.current);
  };

  /**
   * Filters the array based on a predicate function and updates the state.
   * @param predicate - A function that tests each element.
   */
  const filter = (
    predicate: (value: T, index: number, array: T[]) => boolean,
  ) => {
    setState((prev) => prev.filter(predicate));
  };

  /**
   * Updates the value of an element at a specific index.
   * @param index - The index of the element to update.
   * @param value - The new value for the element.
   */
  const updateByIndex = (index: number, value: T) => {
    setState((prev) => prev.map((item, i) => (i === index ? value : item)));
  };

  /**
   * Updates the first occurrence of a specific value with a new value.
   * @param prevValue - The value to be replaced.
   * @param newValue - The new value to replace with.
   */
  const updateByValue = (prevValue: T, newValue: T) => {
    setState((prev) =>
      prev.map((item) => {
        if (typeof item !== "object")
          return item === prevValue ? newValue : item;
        return JSON.stringify(item) === JSON.stringify(prevValue)
          ? newValue
          : item;
      }),
    );
  };

  return [
    state,
    setState,
    {
      push,
      pop,
      shift,
      unshift,
      removeByIndex,
      removeByValue,
      clear,
      filter,
      reset,
      replace,
      updateByIndex,
      updateByValue,
    },
  ] as const;
}
