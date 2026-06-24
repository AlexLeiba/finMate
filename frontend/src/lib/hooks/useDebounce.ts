import { useRef, useCallback } from "react";

export function useDebounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number,
) {
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }

      timeoutId.current = setTimeout(() => {
        fn(...args);
      }, delay);
    },
    [fn, delay],
  );
}
