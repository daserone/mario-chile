import { useState, useCallback } from "react";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useToggle(initial: any) {
  const [state, setState] = useState(initial);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toggle = useCallback(() => setState((prev: any) => !prev), []);
  return { state, toggle };
}
