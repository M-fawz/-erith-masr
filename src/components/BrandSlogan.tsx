import { cn } from "@/lib/cn";

/**
 * "خلوة يا بلدي" calligraphy lockup (always Arabic, even in EN). Rendered as
 * styled Kufam text, stacked on two lines like the design. Defaults to brand
 * orange (navbar, on cream); pass a darker `tone` on low-contrast surfaces
 * (e.g. the sand-deep footer) to keep AA contrast.
 */
export function BrandSlogan({
  className,
  tone = "text-orange",
}: {
  className?: string;
  tone?: string;
}) {
  return (
    <div
      dir="rtl"
      aria-label="خلوة يا بلدي"
      className={cn("select-none font-display leading-[0.95]", tone, className)}
    >
      <span className="block text-xl font-extrabold tracking-tight">خلوة</span>
      <span className="block text-lg font-bold tracking-tight ps-3">يا بلدي</span>
    </div>
  );
}
