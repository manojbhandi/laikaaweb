import { useEffect, useState } from "react";

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState();

  useEffect(() => {
    const tId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(tId);
    };
  }, [value, delay]);

  return debouncedValue;
}
