import { useEffect, useState } from "react";

// QA aid: `?nomotion=1` forces final (motionless) states — handy for visual
// regression screenshots where scroll-triggered reveals wouldn't fire.
const forced =
  typeof window !== "undefined" &&
  new URLSearchParams(window.location.search).has("nomotion");

/** Tracks the user's reduced-motion preference (live). */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(forced);
  useEffect(() => {
    if (forced) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}
