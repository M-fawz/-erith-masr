import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Container } from "@/components/Container";
import { SectionTitle } from "@/components/SectionTitle";
import { Ornament } from "@/components/Ornament";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { MaskIcon } from "@/components/MaskIcon";
import { AnimatedRoute } from "@/components/AnimatedRoute";

const WavesIcon = () => (
  <svg viewBox="0 0 48 48" className="h-12 w-12 text-teal" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
    <path d="M4 18c4-4 8-4 12 0s8 4 12 0 8-4 12 0" />
    <path d="M4 28c4-4 8-4 12 0s8 4 12 0 8-4 12 0" />
  </svg>
);

function DestinationBlock({
  photoFirst,
  title,
  text,
  photo,
  icons,
}: {
  photoFirst: boolean;
  title: string;
  text: string;
  photo: string;
  icons: ReactNode;
}) {
  const Photo = (
    <Reveal direction={photoFirst ? "start" : "end"} className="overflow-hidden rounded-card shadow-card ring-1 ring-line/40">
      <img src={photo} alt={title} loading="lazy" width={800} height={600} className="aspect-[4/3] w-full object-cover" />
    </Reveal>
  );
  const Text = (
    <Reveal direction={photoFirst ? "end" : "start"} className="text-start">
      <div className="flex items-center justify-center gap-2 md:justify-start">
        <Ornament className="h-7 w-5" />
        <h3 className="font-display text-h3 font-bold text-orange">{title}</h3>
        <Ornament className="h-7 w-5" flip />
      </div>
      <p className="mt-3 font-naskh text-lg leading-loose text-ink [text-align:justify]">
        {text}
      </p>
      <div className="mt-4 flex items-center gap-5 justify-center md:justify-start">
        {icons}
      </div>
    </Reveal>
  );

  return (
    <div className="relative z-10 grid items-center gap-6 md:grid-cols-2 md:gap-14">
      {photoFirst ? (
        <>
          {Photo}
          {Text}
        </>
      ) : (
        <>
          {Text}
          {Photo}
        </>
      )}
    </div>
  );
}

export function Program() {
  const { t } = useTranslation();

  return (
    <section id="program" className="scroll-mt-28 pt-section">
      <Container>
        <div className="flex items-center justify-between">
          <Reveal>
            <SectionTitle kicker={t("program.kicker")}>{t("program.title")}</SectionTitle>
          </Reveal>
          <img src="/assets/icons/sailboat.png" alt="" aria-hidden="true" className="h-12 w-auto md:h-16" />
        </div>

        {/* Timeline */}
        <div className="relative mt-12">
          {/* Signature: winding teal route draws on scroll + sailboat travels
              it (desktop). On mobile, a simple static dashed line. */}
          <AnimatedRoute className="pointer-events-none absolute inset-0 z-0 hidden md:block" />
          <span className="absolute inset-y-0 start-3 z-0 block -translate-x-1/2 border-s-2 border-dashed border-teal/40 md:hidden" />

          <div className="space-y-16 md:space-y-28">
            <DestinationBlock
              photoFirst
              title={t("program.dest1.title")}
              text={t("program.dest1.text")}
              photo="/assets/backgrounds/aswan-feluccas.webp"
              icons={
                <>
                  <img src="/assets/icons/wheat.png" alt="" className="h-12 w-auto" />
                  <WavesIcon />
                  <img src="/assets/icons/palm.png" alt="" className="h-12 w-auto" />
                </>
              }
            />
            <DestinationBlock
              photoFirst={false}
              title={t("program.dest2.title")}
              text={t("program.dest2.text")}
              photo="/assets/backgrounds/aswan-sunset.webp"
              icons={
                <>
                  <img src="/assets/icons/nubian-houses.png" alt="" className="h-12 w-auto" />
                  <img src="/assets/icons/nubian-houses.png" alt="" className="h-12 w-auto" />
                </>
              }
            />
            <DestinationBlock
              photoFirst
              title={t("program.dest3.title")}
              text={t("program.dest3.text")}
              photo="/assets/backgrounds/abu-simbel.webp"
              icons={
                <>
                  <img src="/assets/icons/temple-pylon.png" alt="" className="h-12 w-auto" />
                  <img src="/assets/icons/columns.png" alt="" className="h-12 w-auto" />
                </>
              }
            />
          </div>

          {/* Nubian figure at the path's end */}
          <div className="mt-8 flex justify-center">
            <img src="/assets/icons/nubian-figure.png" alt="" aria-hidden="true" className="h-24 w-auto md:h-28" />
          </div>
        </div>
      </Container>

      {/* Footer band */}
      <div className="mt-12 bg-sand-deep">
        <Container className="grid items-center gap-8 py-10 md:grid-cols-3">
          <div className="flex justify-center md:justify-start">
            <img src="/assets/icons/sailboat.png" alt="" aria-hidden="true" className="h-24 w-auto md:h-28" />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button type="button" variant="dark" size="lg">
              {t("program.download")}
            </Button>
            <Button href="#booking" variant="dark" size="lg">
              {t("program.book")}
            </Button>
          </div>
          <div className="flex justify-center md:justify-end">
            <MaskIcon src="/assets/icons/columns.png" className="h-24 w-20 md:h-28 md:w-24" />
          </div>
        </Container>
      </div>
    </section>
  );
}
