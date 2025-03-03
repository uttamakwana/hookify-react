import { Dispatch, SetStateAction, useEffect, useState } from "react";

type TUseStorageReturn<T> = readonly [T, Dispatch<SetStateAction<T>>];
/**
 * Custom hook to synchronize state with localStorage or sessionStorage.
 *
 * @template T - The type of the stored value.
 * @param key - The storage key.
 * @param defaultValue - The default value or a function returning the default value.
 * @param storage - The Storage object (localStorage or sessionStorage).
 * @returns A tuple containing the stored value and a setter function.
 *
 * @example
 * const [data, setData] = useLocalStorage("user", { name: "John" });
 * setData({ name: "Doe" }); // Updates localStorage and state
 */
export function useStorage<T>(
  key: string,
  defaultValue: T | (() => T),
  storage: Storage,
): TUseStorageReturn<T> {
  const [value, setValue] = useState<T>(() => {
    try {
      const storedJsonValue = storage.getItem(key);
      if (storedJsonValue !== null) return JSON.parse(storedJsonValue);
    } catch (error) {
      console.error(`Error parsing storage key "${key}":`, error);
    }

    return typeof defaultValue === "function"
      ? (defaultValue as () => T)()
      : defaultValue;
  });

  useEffect(() => {
    if (value === undefined) {
      storage.removeItem(key);
    } else {
      storage.setItem(key, JSON.stringify(value));
    }
  }, [value, key, storage]);

  return [value, setValue] as const;
}

/**
 * Hook for syncing state with `localStorage`.
 * @template T - The type of the stored value.
 * @param key - The storage key.
 * @param defaultValue - The default value or a function returning the default value.
 *
 * @example
 * import { useLocalStorage } from "hooks-for-react";
 *
 * export default function UseLocalStorage() {
 *  const [name, setName] = useLocalStorage("name", "default name");
 *
 * return <p>Your name is {name}</p>
 * }
 */
export function useLocalStorage<T>(
  key: string,
  defaultValue: T,
): TUseStorageReturn<T> {
  return useStorage(key, defaultValue, window.localStorage);
}

/**
 * Hook for syncing state with `sessionStorage`.
 * @template T - The type of the stored value.
 * @param key - The storage key.
 * @param defaultValue - The default value or a function returning the default value.
 *
 * @example
 * import { useSessionStorage } from "hooks-for-react";
 *
 * export default function UseSessionStorage() {
 *  const [name, setName] = useSessionStorage("name", "default name");
 *
 * return <p>Your name is {name}</p>
 * }
 */
export function useSessionStorage<T>(
  key: string,
  defaultValue: T,
): TUseStorageReturn<T> {
  return useStorage(key, defaultValue, window.sessionStorage);
}
