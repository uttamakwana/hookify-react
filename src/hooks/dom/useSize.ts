import { useEffect, useRef, useState } from "react";

export default function useSize<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState<DOMRect>();

  useEffect(() => {
    if (ref.current == null) return;
    const observer = new ResizeObserver(([entry]) => {
      setSize(entry.contentRect);
    });

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return { ref, size };
}
