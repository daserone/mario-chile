import { useState, useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useDebounce = (value: any, milliSeconds: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, milliSeconds);

    return () => {
      clearTimeout(handler);
    };
  }, [value, milliSeconds]);

  return debouncedValue;
};
