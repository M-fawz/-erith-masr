import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const Star = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={cn("h-[1.1em] w-[1.1em]", className)} fill="currentColor" aria-hidden="true">
    <path d="M12 2.5l2.7 5.9 6.4.6-4.8 4.3 1.4 6.3L12 16.9 6.3 19.6l1.4-6.3L2.9 9l6.4-.6L12 2.5z" />
  </svg>
);

/**
 * 5-star rating with a partial gold fill (left→start to right→end). The gold
 * overlay width is set as a % so it can be animated for the reveal in Phase 3.
 */
export function StarRating({
  value,
  max = 5,
  className,
}: {
  value: number;
  max?: number;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const stars = Array.from({ length: max });

  return (
    <div
      className={cn("relative inline-flex leading-none", className)}
      role="img"
      aria-label={`${value} / ${max}`}
    >
      <div className="flex gap-0.5 text-star-empty">
        {stars.map((_, i) => (
          <Star key={i} />
        ))}
      </div>
      <motion.div
        className="absolute inset-0 overflow-hidden"
        aria-hidden="true"
        initial={reduced ? false : { width: "0%" }}
        whileInView={{ width: `${pct}%` }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        style={reduced ? { width: `${pct}%` } : undefined}
      >
        <div className="flex w-max gap-0.5 text-star">
          {stars.map((_, i) => (
            <Star key={i} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
