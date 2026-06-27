import { useTranslation } from "react-i18next";
import { Container } from "./Container";
import { BrandSlogan } from "./BrandSlogan";
import { Socials } from "./Socials";
import { NAV_ITEMS } from "@/lib/site";

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-section overflow-hidden bg-sand-deep text-ink">
      {/* Teal motif strip echoing the Program footer band. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-teal/70" />
      <img
        src="/assets/icons/sailboat.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 end-4 h-28 w-auto opacity-15 md:h-40"
      />

      <Container className="relative grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:py-16">
        {/* Brand */}
        <div className="space-y-4">
          <a href="#home" className="inline-flex" aria-label={t("brand.name")}>
            <img
              src="/assets/logo/LOGO-final.png"
              alt={t("brand.name")}
              className="h-12 w-auto object-contain"
              width={220}
              height={120}
            />
          </a>
          <p className="max-w-sm font-body text-sm leading-relaxed text-ink/80">
            {t("footer.tagline")}
          </p>
          <BrandSlogan />
        </div>

        {/* Quick links */}
        <nav aria-label={t("footer.quickLinks")} className="space-y-4">
          <h3 className="font-display text-lg font-bold text-orange">
            {t("footer.quickLinks")}
          </h3>
          <ul className="space-y-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="font-body text-sm text-ink/80 transition-colors hover:text-orange"
                >
                  {t(item.key)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social */}
        <div className="space-y-4">
          <h3 className="font-display text-lg font-bold text-orange">
            {t("footer.followus")}
          </h3>
          <Socials />
          <p className="font-body text-sm text-ink/70">
            ticketing@rabietours.com
          </p>
        </div>
      </Container>

      <div className="border-t border-ink/10">
        <Container className="flex flex-col items-center justify-between gap-2 py-5 text-center font-body text-xs text-ink/70 sm:flex-row sm:text-start">
          <p>
            © {year} {t("brand.name")} — Rabie Tours · {t("footer.rights")}
          </p>
          <p>{t("footer.madeWith")} ❤</p>
        </Container>
      </div>
    </footer>
  );
}
