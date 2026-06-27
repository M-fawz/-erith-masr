import { useTranslation } from "react-i18next";
import { cn } from "@/lib/cn";

/**
 * Brand lockup for the navbar/footer: the "إرث مصر / ERTH MASR" wordmark +
 * orange calligraphy mark (single client lockup PNG). Links back to the top.
 */
export function Logo({ className }: { className?: string }) {
  const { t } = useTranslation();
  return (
    <a
      href="#home"
      aria-label={t("brand.name")}
      className={cn("flex shrink-0 items-center", className)}
    >
      <img
        src="/assets/logo/LOGO-final.png"
        alt={t("brand.name")}
        width={220}
        height={120}
        className="h-10 w-auto object-contain md:h-12"
      />
    </a>
  );
}
