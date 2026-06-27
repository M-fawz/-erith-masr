import type { ReactNode } from "react";
import { motion, type Variants } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type Direction = "up" | "down" | "start" | "end" | "none";

const offset = (dir: Direction, d: number) => {
  switch (dir) {
    case "up":
      return { y: d };
    case "down":
      return { y: -d };
    case "start":
      return { x: d }; // travels in from the inline-start side
    case "end":
      return { x: -d };
    default:
      return {};
  }
};

/**
 * Scroll-reveal wrapper: fades + slides + subtly scales children into view
 * once. Honors prefers-reduced-motion (renders final state, no motion).
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
  as?: keyof typeof motion;
  direction?: Direction;
  distance?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  if (reduced) {
    const Tag = as as "div";
    return <Tag className={className}>{children}</Tag>;
  }

  const variants: Variants = {
    hidden: { opacity: 0, scale: 0.985, ...offset(direction, distance) },
    show: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      {children}
    </MotionTag>
  );
}

/** Container that staggers its <Reveal> (or motion) children. */
export function RevealGroup({
  children,
  className,
  stagger = 0.1,
  delayChildren = 0,
  once = true,
  amount = 0.2,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
  once?: boolean;
  amount?: number;
}) {
  const reduced = usePrefersReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren } },
      }}
    >
      {children}
    </motion.div>
  );
}
