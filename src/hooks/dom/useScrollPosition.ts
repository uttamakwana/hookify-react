import { useEffect } from 'react';

export default function useScrollPosition(element = window) {
 useEffect(() => {
  function handleScroll(e: unknown) {
   console.log(e);
  }
  element.addEventListener("scroll", (e) => {
   console.log(e);
  })

  return () => element.removeEventListener("scroll", handleScroll);
 }, [element])
}
