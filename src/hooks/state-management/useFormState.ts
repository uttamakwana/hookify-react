import { useCallback, useMemo, useRef, useState } from 'react';

type TError = string | undefined;
type TDefaultValue<T> = T | (() => T);
type TPredicates<T> = Array<(value: T) => TError>;
type TSetterFunction<T> = (v: T) => T;
type TOptions = {
 emptyInputValidation?: boolean;
}

/**
 * Custom hook to manage form state with dynamic validation and error tracking.
 * @param defaultValue - The initial default value or a function returning the default value.
 * @param predicates - A list of predicates used to validate the value and track errors.
 */
export function useFormState<T>(
 defaultValue: TDefaultValue<T>,
 predicates: TPredicates<T>,
 { emptyInputValidation }: TOptions = { emptyInputValidation: true }
) {
 // Initialize default errors array safely.
 const defaultErrors = useMemo(() => Array<undefined>(predicates.length).fill(undefined), [predicates.length]);

 // Resolve default value only once.
 const resolvedDefaultValue = useMemo(
  () => (typeof defaultValue === 'function' ? (defaultValue as () => T)() : defaultValue),
  [defaultValue]
 );

 const resolvedDefaultValueRef = useRef(resolvedDefaultValue);

 const [state, setState] = useState<T>(resolvedDefaultValue);
 const [errors, setErrors] = useState<Array<TError>>(defaultErrors);

 /**
  * Validates the state against all provided predicates.
  * Updates errors only if changes occur.
  * @param value - Current value to validate.
  */
 const validate = useCallback(
  (localValue: T) => {
   const newErrors = predicates.map((predicate) => predicate(localValue));

   const hasErrorChanged = newErrors.some((error, index) => error !== errors[index]);

   if (hasErrorChanged) {
    setErrors(newErrors);
   }
  },
  [predicates, errors]
 );

 /**
  * Sets the value, supporting both direct and functional state updates.
  * Triggers validation after updating state.
  * @param value - The new value or a setter function.
  */
 const setValue = useCallback(
  (value: T | TSetterFunction<T>) => {
   const newValue = typeof value === 'function' ? (value as (prev: T) => T)(state) : value;
   setState(newValue);
   validate(newValue);
   if (typeof newValue === "string" && newValue.length === 0 && !emptyInputValidation) { setErrors(defaultErrors) }
  },
  [state, validate, defaultErrors, emptyInputValidation]
 );

 const filteredErrors = useMemo(() => errors.filter((error) => typeof error === 'string'), [errors]);
 const isValid = filteredErrors.length === 0;

 const status = useMemo(() => {
  if (resolvedDefaultValueRef.current === state && isValid) return 'idle';
  if (!isValid) return 'error';
  return 'valid';
 }, [state, isValid]);

 return [state, setValue, { errors: filteredErrors, isValid, status }] as const;
}
