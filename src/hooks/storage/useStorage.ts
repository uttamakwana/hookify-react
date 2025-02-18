import { useEffect, useState } from 'react';

export default function useStorage<T>(key: string, defaultValue: T | (() => T), storage: Storage) {
 const [value, setValue] = useState<T>(() => {
  const getStoredJsonValue = storage.getItem(key);
  if (getStoredJsonValue !== null) return JSON.parse(getStoredJsonValue);

  // if (typeof defaultValue === "function") {
  //  return (defaultValue as (() => T))();
  // } else {
  //  return defaultValue;
  // };

  return typeof defaultValue === "function" ? (defaultValue as (() => T))() : defaultValue;
 });

 useEffect(() => {
  if (value === undefined) return storage.removeItem(key);
  storage.setItem(key, JSON.stringify(value));
 }, [value, key, storage])

 return [value, setValue] as const;
}

export function useLocalStorage<T>(key: string, defaultValue: T) {
 return useStorage(key, defaultValue, window.localStorage);
}

export function useSessionStorage<T>(key: string, defaultValue: T) {
 return useStorage(key, defaultValue, window.sessionStorage);
}
