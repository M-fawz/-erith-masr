import { cn } from "@/lib/cn";

/**
 * Recolors a flat PNG (using its alpha) to any solid brand color via CSS mask.
 * Used to render the orange `columns.png` asset as TEAL in the Program footer.
 */
export function MaskIcon({
  src,
  className,
  color = "var(--teal)",
}: {
  src: string;
  className?: string;
  color?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn("inline-block", className)}
      style={{
        backgroundColor: color,
        maskImage: `url(${src})`,
        WebkitMaskImage: `url(${src})`,
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
        maskSize: "contain",
        WebkitMaskSize: "contain",
      }}
    />
  );
}
