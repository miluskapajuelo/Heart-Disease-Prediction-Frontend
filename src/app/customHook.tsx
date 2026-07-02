import { useEffect, useRef, useState } from "react";

export function usePersistentState<T>(key: string, initial: T) {
  const [state, setState] = useState<T>(initial);
  const first = useRef(true);

  useEffect(() => {
    try {
      const savedData = sessionStorage.getItem(key);
      if (savedData) setState(JSON.parse(savedData));
    } catch (e) { console.error(e);}
  }, [key]);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    try {
      sessionStorage.setItem(key, JSON.stringify(state));
    } catch (e) {
      console.error(e);
    }
  }, [key, state]);

  return [state, setState] as const
}
