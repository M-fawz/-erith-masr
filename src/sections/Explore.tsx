import { useTranslation } from "react-i18next";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { Reveal } from "@/components/Reveal";
import { cn } from "@/lib/cn";

const ITEMS = [
  { key: "abuSimbel", img: "/assets/backgrounds/abu-simbel.webp", w: 640, h: 640, wide: true },
  { key: "balloons", img: "/assets/backgrounds/balloons.webp", w: 1076, h: 1348 },
  { key: "qaitbay", img: "/assets/backgrounds/qaitbay.webp", w: 720, h: 900 },
  { key: "philae", img: "/assets/backgrounds/pharaonic-temple.webp", w: 1148, h: 2048, tall: true },
  { key: "azhar", img: "/assets/backgrounds/al-azhar.webp", w: 768, h: 1024 },
  { key: "montaza", img: "/assets/backgrounds/montaza.webp", w: 736, h: 932 },
  { key: "toutankhamun", img: "/assets/backgrounds/toutankhamun.webp", w: 1080, h: 1920 },
  { key: "ibnTulun", img: "/assets/backgrounds/ibn-tulun.webp", w: 735, h: 1152, wide: true },
] as const;

export function Explore() {
  const { t } = useTranslation();

  return (
    <section id="explore" className="section-pad scroll-mt-28 bg-cream/40">
      <Container>
        <Reveal>
          <SectionTitle kicker={t("explore.kicker")}>{t("explore.title")}</SectionTitle>
          <p className="mt-3 max-w-2xl font-body text-lead text-ink-sand text-start">
            {t("explore.subtitle")}
          </p>
        </Reveal>

        <div className="mt-10 grid auto-rows-[200px] grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {ITEMS.map((item, i) => (
            <Reveal
              key={item.key}
              delay={(i % 4) * 0.08}
              direction="up"
              className={cn(
                "group relative overflow-hidden rounded-card shadow-soft ring-1 ring-line/40",
                "wide" in item && item.wide && "sm:col-span-2",
                "tall" in item && item.tall && "row-span-2",
              )}
            >
              <img
                src={item.img}
                alt={t(`explore.items.${item.key}.title`)}
                loading="lazy"
                width={item.w}
                height={item.h}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-start text-cream">
                <h3 className="font-display text-lg font-bold drop-shadow">
                  {t(`explore.items.${item.key}.title`)}
                </h3>
                <p className="mt-1 max-h-0 overflow-hidden font-body text-xs leading-relaxed text-cream/85 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
                  {t(`explore.items.${item.key}.caption`)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
