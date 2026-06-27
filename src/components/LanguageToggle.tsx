import { useTranslation } from "react-i18next";
import { cn } from "@/lib/cn";

/** Compact AR | EN segmented switch. */
export function LanguageToggle({ className }: { className?: string }) {
  const { i18n } = useTranslation();
  const isAr = i18n.language.startsWith("ar");

  const seg = (active: boolean) =>
    cn(
      "rounded-pill px-3 py-1 text-sm font-bold leading-none transition-colors",
      active ? "bg-ink text-white shadow-soft" : "text-ink-soft hover:text-orange",
    );

  return (
    <div
      role="group"
      aria-label="Language / اللغة"
      className={cn(
        "inline-flex items-center gap-0.5 rounded-pill border border-line bg-cream p-0.5",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => i18n.changeLanguage("ar")}
        aria-pressed={isAr}
        className={seg(isAr)}
      >
        ع
      </button>
      <button
        type="button"
        onClick={() => i18n.changeLanguage("en")}
        aria-pressed={!isAr}
        className={seg(!isAr)}
      >
        EN
      </button>
    </div>
  );
}
