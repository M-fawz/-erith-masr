import { cn } from "@/lib/cn";

/**
 * ✶ decorative ornament that flanks destination/section titles. Stroke-based
 * so it can "draw in" during the Phase 3 motion pass.
 */
export function Ornament({
  className,
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 28 36"
      className={cn("h-8 w-6 text-teal", className)}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M14 3v30" />
      <path d="M14 9c-3 0-6-2-7-4M14 9c3 0 6-2 7-4" />
      <path d="M14 27c-3 0-6 2-7 4M14 27c3 0 6 2 7 4" />
      <path d="M5 18h18" />
      <path d="M9 14l-4 4 4 4M19 14l4 4-4 4" />
      <circle cx="14" cy="18" r="2.4" fill="currentColor" stroke="none" />
    </svg>
  );
}
