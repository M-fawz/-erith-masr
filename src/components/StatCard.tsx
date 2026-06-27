import type { ReactNode } from "react";
import CountUp from "react-countup";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * White stat card: thin orange line icon top inline-end, big orange count-up
 * number, orange unit, orange caption. Lifts on hover.
 */
export function StatCard({
  icon,
  number,
  prefix = "",
  suffix = "",
  unit,
  caption,
}: {
  icon: ReactNode;
  number: number;
  prefix?: string;
  suffix?: string;
  unit: string;
  caption: string;
}) {
  const reduced = usePrefersReducedMotion();

  return (
    <div className="group h-full rounded-card bg-card p-6 text-start shadow-card ring-1 ring-line/50 transition-transform duration-300 will-change-transform hover:-translate-y-1.5">
      <div className="flex justify-end text-orange">
        <span className="grid h-9 w-9 place-items-center">{icon}</span>
      </div>

      <div className="mt-1 font-display text-stat font-extrabold leading-none text-orange">
        {reduced ? (
          `${prefix}${number}${suffix}`
        ) : (
          <CountUp
            end={number}
            prefix={prefix}
            suffix={suffix}
            duration={2.2}
            enableScrollSpy
            scrollSpyOnce
          />
        )}
      </div>

      <div className="mt-1 font-display text-lg font-bold text-orange/95">
        {unit}
      </div>
      <p className="mt-3 font-body text-sm leading-relaxed text-orange/85">
        {caption}
      </p>
    </div>
  );
}
