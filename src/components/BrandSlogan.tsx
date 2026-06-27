import { cn } from "@/lib/cn";

/**
 * "خلوة يا بلدي" calligraphy lockup (always Arabic, even in EN). Rendered as
 * styled Kufam text in brand orange, stacked on two lines like the design.
 */
export function BrandSlogan({ className }: { className?: string }) {
  return (
    <div
      dir="rtl"
      aria-label="خلوة يا بلدي"
      className={cn(
        "select-none text-orange font-display leading-[0.95]",
        className,
      )}
    >
      <span className="block text-xl font-extrabold tracking-tight">خلوة</span>
      <span className="block text-lg font-bold tracking-tight ps-3">يا بلدي</span>
    </div>
  );
}
