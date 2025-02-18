import { useRef, useState } from 'react';
type CounterValueType = number;

/**
 * A custom hook that provides functionality for managing a counter.
 * It allows for incrementing, decrementing, and resetting the counter,
 * as well as incrementing and decrementing by a specific value.
 *
 * @param initialValue - The initial value of the counter.
 *
 * @returns An object containing the following:
 *  - `count`: The current value of the counter.
 *  - `increment`: Function to increment the counter by 1.
 *  - `incrementByValue`: Function to increment the counter by a specified value.
 *  - `decrement`: Function to decrement the counter by 1.
 *  - `decrementByValue`: Function to decrement the counter by a specified value.
 *  - `reset`: Function to reset the counter to its initial value.
 */
export default function useCounter(initialValue: CounterValueType = 0) {
 // State to hold the current counter value.
 const [count, setCount] = useState<CounterValueType>(initialValue);

 // Ref to store the initial value for resetting purposes.
 const initialValueRef = useRef<CounterValueType>(initialValue);

 // Function to increment the counter by 1.
 const increment = () => {
  setCount((prev) => prev + 1);
 };

 // Function to increment the counter by a specific value.
 const incrementByValue = (value: CounterValueType) => {
  setCount((prev) => prev + value);
 };

 // Function to decrement the counter by 1.
 const decrement = () => {
  setCount((prev) => prev - 1);
 };

 // Function to decrement the counter by a specific value.
 const decrementByValue = (value: CounterValueType) => {
  setCount((prev) => prev - value);
 };

 // Function to reset the counter to the initial value.
 const reset = () => {
  setCount(initialValueRef.current);
 };

 // Returning the counter value and the functions for modifying it.
 return { count, increment, incrementByValue, decrement, decrementByValue, reset };
}
