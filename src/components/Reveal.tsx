import { createElement, useEffect, useRef, useState, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Direction = "up" | "down" | "start" | "end" | "none";

/** Hidden-state transform per direction (physical axis, matches prior design). */
function hiddenTransform(dir: Direction, d: number): string {
  switch (dir) {
    case "up":
      return `translateY(${d}px) scale(0.985)`;
    case "down":
      return `translateY(${-d}px) scale(0.985)`;
    case "start":
      return `translateX(${d}px) scale(0.985)`;
    case "end":
      return `translateX(${-d}px) scale(0.985)`;
    default:
      return "scale(0.985)";
  }
}

/**
 * Scroll-reveal wrapper: fades + slides + subtly scales children into view once.
 * Uses a plain IntersectionObserver + CSS transition (no framer-motion) so it
 * stays off the animation library's critical path. Honors reduced-motion.
 */
export function Reveal({
  children,
  as = "div",
  direction = "up",
  distance = 28,
  delay = 0,
  duration = 0.6,
  once = true,
  amount = 0.25,
  className,
}: {
  children: ReactNode;
  as?: keyof JSX.IntrinsicElements;
  direction?: Direction;
  distance?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          if (once) io.disconnect();
        } else if (!once) {
          setShown(false);
        }
      },
      { threshold: amount },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced, once, amount]);

  if (reduced) {
    return createElement(as, { className }, children);
  }

  const style: React.CSSProperties = {
    opacity: shown ? 1 : 0,
    transform: shown ? "none" : hiddenTransform(direction, distance),
    transition: `opacity ${duration}s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform ${duration}s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
    willChange: "opacity, transform",
  };

  return createElement(as, { ref, className, style }, children);
}
