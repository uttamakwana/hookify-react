import { useRef, useState } from "react";
import { useEventListener } from "./useEventListener.ts";

type TScrollValues = {
  scrollY: number;
  scrollX: number;
  screenLeft: number;
  screenTop: number;
};

const initialScrollValue = {
  scrollY: 0,
  scrollX: 0,
  screenLeft: 0,
  screenTop: 0,
};

export default function useScrollPosition(element = window): TScrollValues {
  const ref = useRef(element);
  const [state, setState] = useState<TScrollValues>(initialScrollValue);

  function handleScroll() {
    setState({
      scrollY: ref.current.scrollY,
      scrollX: ref.current.scrollX,
      screenLeft: ref.current.screenLeft,
      screenTop: ref.current.screenTop,
    });
    // console.log(ref.current.scrollY);
  }

  useEventListener("scroll", handleScroll);
  return state;
}
