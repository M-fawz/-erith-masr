import { useTranslation } from "react-i18next";
import { Container } from "@/components/Container";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { LazyVideo } from "@/components/LazyVideo";

export function Hero() {
  const { t } = useTranslation();

  return (
    <section id="home" className="relative scroll-mt-28 overflow-hidden">
      {/* Soft intro video behind the composition (muted, play-on-view) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <LazyVideo
          sources={[{ src: "/assets/video/intro.mp4", type: "video/mp4" }]}
          poster="/assets/video/intro-poster.jpg"
          className="h-full w-full"
          videoClassName="h-full w-full object-cover opacity-20"
        />
        {/* Sand scrim so the page reads clean like the reference */}
        <div className="absolute inset-0 bg-gradient-to-b from-sand/80 via-sand/55 to-sand/90" />
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_70%_30%,transparent,var(--sand))]" />
      </div>

      <Container className="grid items-center gap-8 py-10 md:py-16 lg:grid-cols-2 lg:gap-6">
        {/* Text — inline-end (right) on desktop */}
        <div className="order-2 min-w-0 max-w-xl text-start lg:order-1">
          <Reveal direction="up" delay={0.05}>
            <h1 className="font-display text-hero font-extrabold leading-[1.05] text-ink">
              {t("hero.title")}
            </h1>
          </Reveal>
          <Reveal direction="up" delay={0.16}>
            <p className="mt-6 max-w-md text-balance font-body text-lead leading-relaxed text-ink-sand">
              {t("hero.subtitle")}
            </p>
          </Reveal>
          <Reveal direction="up" delay={0.28}>
            <div className="mt-8">
              <Button href="#booking" variant="dark" size="lg">
                {t("hero.cta")}
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Composition — inline-start (left) on desktop */}
        <Reveal
          direction="end"
          delay={0.1}
          distance={36}
          className="relative order-1 min-w-0 lg:order-2"
        >
          {/* Palm watermark behind the men */}
          <img
            src="/assets/icons/palm.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 m-auto h-[85%] w-auto animate-float-slow opacity-[0.12] [filter:sepia(1)_saturate(5)_hue-rotate(-12deg)]"
          />
          <img
            src="/assets/backgrounds/hero-island.webp"
            alt={t("hero.title")}
            width={1400}
            height={788}
            className="relative mx-auto w-full max-w-[660px] animate-float drop-shadow-[0_30px_45px_rgba(31,31,31,0.28)]"
          />
        </Reveal>
      </Container>
    </section>
  );
}
