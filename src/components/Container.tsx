import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Centered page container at the design's max width (var(--container)). */
export function Container({
  as: As = "div",
  className,
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return <As className={cn("container-x", className)}>{children}</As>;
}
