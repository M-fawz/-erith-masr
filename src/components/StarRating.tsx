import { cn } from "@/lib/cn";

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
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${pct}%` }}
        aria-hidden="true"
      >
        <div className="flex w-max gap-0.5 text-star">
          {stars.map((_, i) => (
            <Star key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
