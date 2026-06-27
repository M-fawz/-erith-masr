import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Orange display section heading. Ornament dividers (✶) are layered in during
 * the motion phase; for now this is the faithful static title.
 */
export function SectionTitle({
  children,
  kicker,
  align = "start",
  className,
}: {
  children: ReactNode;
  kicker?: string;
  align?: "start" | "center";
  className?: string;
}) {
  return (
    <header
      className={cn(
        align === "center" ? "text-center" : "text-start",
        className,
      )}
    >
      {kicker ? (
        <p className="mb-2 font-body text-sm font-semibold uppercase tracking-[0.2em] text-teal/80">
          {kicker}
        </p>
      ) : null}
      <h2 className="font-display text-h2 font-bold text-orange">{children}</h2>
    </header>
  );
}
