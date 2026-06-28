import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const STROKES = [
  "M14 3v30",
  "M14 9c-3 0-6-2-7-4M14 9c3 0 6-2 7-4",
  "M14 27c-3 0-6 2-7 4M14 27c3 0 6 2 7 4",
  "M5 18h18",
  "M9 14l-4 4 4 4M19 14l4 4-4 4",
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const stroke: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: { pathLength: 1, opacity: 1, transition: { duration: 0.45 } },
};

/**
 * ✶ ornament flanking destination/section titles. Strokes draw in on reveal.
 */
export function Ornament({
  className,
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  const reduced = usePrefersReducedMotion();
  const common = {
    viewBox: "0 0 28 36",
    className: cn("h-8 w-6 text-teal", className),
    style: flip ? { transform: "scaleX(-1)" } : undefined,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    "aria-hidden": true as const,
  };

  if (reduced) {
    return (
      <svg {...common}>
        {STROKES.map((d, i) => (
          <path key={i} d={d} />
        ))}
        <circle cx="14" cy="18" r="2.4" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  return (
    <motion.svg
      {...common}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.6 }}
    >
      {STROKES.map((d, i) => (
        <motion.path key={i} d={d} variants={stroke} />
      ))}
      <motion.circle
        cx="14"
        cy="18"
        r="2.4"
        fill="currentColor"
        stroke="none"
        variants={{ hidden: { scale: 0 }, show: { scale: 1 } }}
        style={{ transformOrigin: "14px 18px" }}
      />
    </motion.svg>
  );
}
