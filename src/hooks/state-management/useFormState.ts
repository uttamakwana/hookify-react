import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";

type TError = string | undefined;
type TDefaultValue<T> = T | (() => T);
type TPredicates<T> = Array<(value: T) => TError>;
type TSetterFunction<T> = (prev: T) => T;
type TOptions = {
  emptyInputValidation?: boolean;
};
type TStatus = "idle" | "valid" | "error";

type TData = {
  errors: Array<string>;
  isValid: boolean;
  status: TStatus;
};
type TUseFormStateReturn<T> = readonly [T, Dispatch<SetStateAction<T>>, TData];

/**
 * Custom hook to manage form state with validation and error tracking.
 * @template T - Type of the form state value.
 * @param {TDefaultValue<T>} defaultValue - Initial value or a function returning the initial value.
 * @param {TPredicates<T>} predicates - Array of validation functions returning an error message or undefined.
 * @param {TOptions} [options] - Additional configuration options.
 * @returns {[T, (value: T | TSetterFunction<T>) => void, { errors: string[], isValid: boolean, status: "idle" | "valid" | "error" }]}
 * Returns the state, a setter function, and an object containing validation errors, validity status, and form status.
 *
 * @example
 * import { useFormState } from "hooks-for-react";
 *
 * export default function UseFormState() {
 *  const [name, setName, { errors, isValid, status }] = useFormState("Hooks for React", [(name) => name.length < 3 ? "Name must have atleast 3 character" : undefined, (name) => name.includes("bad words") ? "Name must not contain bad words" ? undefined]);
 *
 *  return (
 *     <div>
 *        <input value={name} onChange={e => setName(e.target.value)} placeholder="Enter your name" />
 *     </div>
 *  );
 * }
 */
export function useFormState<T>(
  defaultValue: TDefaultValue<T>,
  predicates: TPredicates<T>,
  { emptyInputValidation = true }: TOptions = {},
): TUseFormStateReturn<T> {
  // Resolve the default value once and store it in a ref for later comparison.
  const resolvedDefaultValue = useMemo(
    () =>
      typeof defaultValue === "function"
        ? (defaultValue as () => T)()
        : defaultValue,
    [defaultValue],
  );
  const resolvedDefaultValueRef = useRef(resolvedDefaultValue);

  // State management for value and errors.
  const [state, setState] = useState<T>(resolvedDefaultValue);
  const [errors, setErrors] = useState<TError[]>(
    Array(predicates.length).fill(undefined),
  );

  /**
   * Validates the provided value against all predicates.
   * Updates the errors state only if they have changed.
   * @param {T} value - The current value to validate.
   */
  const validate = useCallback(
    (value: T) => {
      const newErrors = predicates.map((predicate) => predicate(value));
      if (JSON.stringify(newErrors) !== JSON.stringify(errors)) {
        setErrors(newErrors);
      }
    },
    [predicates, errors],
  );

  /**
   * Sets the value while supporting both direct values and updater functions.
   * Also triggers validation upon state update.
   * @param {T | TSetterFunction<T>} value - The new value or a setter function.
   */
  const setValue = useCallback(
    (value: T | TSetterFunction<T>) => {
      setState((prev) => {
        const newValue =
          typeof value === "function"
            ? (value as TSetterFunction<T>)(prev)
            : value;
        validate(newValue);
        if (
          typeof newValue === "string" &&
          newValue.length === 0 &&
          !emptyInputValidation
        ) {
          setErrors([]);
        }
        return newValue;
      });
    },
    [validate, emptyInputValidation],
  );

  // Filter errors to remove undefined values.
  const filteredErrors = useMemo(
    () => errors.filter((error): error is string => !!error),
    [errors],
  );
  const isValid = filteredErrors.length === 0;

  /**
   * Determines the form status:
   * - `"idle"`: No changes from the initial value.
   * - `"valid"`: Valid changes made.
   * - `"error"`: Validation errors present.
   */
  const status = useMemo(() => {
    if (resolvedDefaultValueRef.current === state && isValid) return "idle";
    return isValid ? "valid" : "error";
  }, [state, isValid]);

  return [
    state,
    setValue,
    { errors: filteredErrors, isValid, status },
  ] as const;
}
