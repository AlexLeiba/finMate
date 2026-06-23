import { useEffect, useState } from "react";
import { BREAKPOINTS } from "../consts/breakpoints";

export function useResponsive(breakpoint: number = BREAKPOINTS.sm): boolean {
  const [isWidthSize, setIsWidthSize] = useState<boolean | undefined>(
    undefined,
  );

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const onChange = () => {
      setIsWidthSize(window.innerWidth < breakpoint);
    };
    mql.addEventListener("change", onChange);
    setIsWidthSize(window.innerWidth < breakpoint);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isWidthSize;
}
