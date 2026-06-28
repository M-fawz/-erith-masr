import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Menu, Search, X } from "lucide-react";
import { Logo } from "./Logo";
import { BrandSlogan } from "./BrandSlogan";
import { LanguageToggle } from "./LanguageToggle";
import { Container } from "./Container";
import { NAV_ITEMS, SECTION_IDS } from "@/lib/site";
import { useScrolled } from "@/hooks/useScrolled";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { cn } from "@/lib/cn";

function SearchPill({ className }: { className?: string }) {
  const { t } = useTranslation();
  return (
    <form
      role="search"
      onSubmit={(e) => e.preventDefault()}
      className={cn(
        "flex items-center gap-2 rounded-pill border border-line bg-cream/70 px-4 py-2",
        "focus-within:border-orange focus-within:ring-2 focus-within:ring-orange/30 transition",
        className,
      )}
    >
      <Search className="h-4 w-4 shrink-0 text-ink-soft" aria-hidden="true" />
      <input
        type="search"
        placeholder={t("nav.search")}
        aria-label={t("nav.search")}
        className="w-full bg-transparent text-base text-ink outline-none placeholder:text-ink-soft/70 md:text-sm"
      />
    </form>
  );
}

function NavLinks({
  active,
  onNavigate,
  className,
  itemClassName,
}: {
  active: string | null;
  onNavigate?: () => void;
  className?: string;
  itemClassName?: string;
}) {
  const { t } = useTranslation();
  return (
    <ul className={className}>
      {NAV_ITEMS.map((item) => {
        const isActive = active === item.id;
        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              onClick={onNavigate}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "relative font-body transition-colors duration-200",
                isActive
                  ? "font-bold text-ink"
                  : "font-semibold text-ink-soft hover:text-orange",
                itemClassName,
              )}
            >
              {t(item.key)}
              <span
                className={cn(
                  "absolute -bottom-1.5 start-0 h-0.5 rounded-full bg-orange transition-all duration-300",
                  isActive ? "w-full opacity-100" : "w-0 opacity-0",
                )}
              />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export function Navbar() {
  const { t, i18n } = useTranslation();
  const scrolled = useScrolled(8);
  const active = useScrollSpy(SECTION_IDS);
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLElement>(null);
  // The drawer is pinned to the inline-end edge; the slide transform is physical,
  // so it must slide off toward the right in LTR and the left in RTL.
  const drawerOffscreen = i18n.dir() === "rtl" ? "-100%" : "100%";

  // Keep the off-screen drawer out of the tab order / a11y tree when closed.
  useEffect(() => {
    if (drawerRef.current) drawerRef.current.inert = !open;
  }, [open]);

  // Lock body scroll + close drawer on Escape while the mobile drawer is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      <Container className="pt-3 md:pt-4">
        <nav
          aria-label={t("nav.menu")}
          className={cn(
            "flex items-center gap-3 rounded-[26px] border border-line bg-cream/85 px-3 py-2 backdrop-blur-md transition-shadow duration-300 md:px-5 lg:gap-5",
            scrolled ? "shadow-card" : "shadow-soft",
          )}
        >
          <Logo />

          <NavLinks
            active={active}
            className="hidden items-center gap-5 lg:flex xl:gap-6"
          />

          <SearchPill className="hidden min-w-0 flex-1 md:flex lg:max-w-xs" />

          <BrandSlogan className="hidden xl:block" />

          <LanguageToggle className="ms-auto md:ms-0" />

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={t("a11y.openMenu")}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-sand/60 lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
        </nav>
      </Container>

      {/* Mobile drawer (CSS transitions; framer-motion stays off the critical path) */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-ink/40 transition-opacity duration-300 lg:hidden",
          open ? "opacity-100 backdrop-blur-sm" : "pointer-events-none opacity-0",
        )}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <aside
        ref={drawerRef}
        className="fixed inset-y-0 end-0 z-50 flex w-[82%] max-w-sm flex-col gap-6 bg-cream p-6 shadow-card transition-transform duration-300 ease-out lg:hidden motion-reduce:transition-none"
        style={{ transform: open ? "translateX(0)" : `translateX(${drawerOffscreen})` }}
        role="dialog"
        aria-modal="true"
        aria-label={t("nav.menu")}
      >
        <div className="flex items-center justify-between">
          <Logo />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label={t("a11y.closeMenu")}
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-sand/60"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <SearchPill />

        <NavLinks
          active={active}
          onNavigate={() => setOpen(false)}
          className="flex flex-col gap-4 text-lg"
          itemClassName="text-xl"
        />

        <div className="mt-auto flex items-center justify-between">
          <BrandSlogan />
          <LanguageToggle />
        </div>
      </aside>
    </header>
  );
}
