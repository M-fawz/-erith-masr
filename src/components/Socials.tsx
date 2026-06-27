import { useTranslation } from "react-i18next";
import { SOCIALS, type SocialName } from "@/lib/site";
import { cn } from "@/lib/cn";

/* Brand glyphs as inline SVG (lucide dropped brand icons; keeps us accurate). */
export const SOCIAL_ICONS: Record<SocialName, JSX.Element> = {
  facebook: (
    <path d="M14 9h2.5V6H14c-2 0-3.2 1.2-3.2 3.3V11H8.5v3h2.3v7h3v-7H16l.5-3h-2.7V9.6c0-.4.3-.6.7-.6Z" />
  ),
  instagram: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="5" fill="none" strokeWidth="2" />
      <circle cx="12" cy="12" r="3.4" fill="none" strokeWidth="2" />
      <circle cx="17" cy="7" r="1.3" />
    </>
  ),
  tiktok: (
    <path d="M14 4c.3 2 1.6 3.6 3.8 3.9V11c-1.4 0-2.7-.4-3.8-1.1v5.2c0 2.7-2.1 4.9-4.8 4.9S4.4 17.8 4.4 15.1 6.5 10.2 9.2 10.2c.3 0 .5 0 .8.1v3c-.3-.1-.5-.2-.8-.2-1 0-1.9.9-1.9 2s.8 2 1.9 2 1.9-.9 1.9-2V4H14Z" />
  ),
};

export function Socials({
  className,
  variant = "solid",
}: {
  className?: string;
  variant?: "solid" | "ghost";
}) {
  const { t } = useTranslation();
  return (
    <ul className={cn("flex items-center gap-3", className)}>
      {SOCIALS.map((s) => (
        <li key={s.name}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t(s.labelKey)}
            className={cn(
              "group flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-200 hover:-translate-y-0.5",
              variant === "solid"
                ? "bg-ink text-white hover:bg-orange"
                : "bg-cream text-ink ring-1 ring-line hover:text-orange hover:ring-orange",
            )}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="currentColor"
              stroke="currentColor"
              aria-hidden="true"
            >
              {SOCIAL_ICONS[s.name]}
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
