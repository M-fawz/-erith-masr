import { useTranslation } from "react-i18next";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { LazyVideo } from "@/components/LazyVideo";

export function Aswan() {
  const { t } = useTranslation();

  return (
    <section
      id="aswan"
      className="relative flex min-h-[72vh] scroll-mt-28 items-end overflow-hidden bg-ink py-16 md:min-h-[82vh]"
    >
      {/* Rotation-corrected, Ken-Burns video (mp4 first — smaller here) */}
      <LazyVideo
        sources={[
          { src: "/assets/video/aswan.mp4", type: "video/mp4" },
          { src: "/assets/video/aswan.webm", type: "video/webm" },
        ]}
        poster="/assets/video/aswan-poster.jpg"
        ariaLabel={t("aswan.title")}
        className="absolute inset-0 aswan-kenburns"
        videoClassName="aswan-video"
      />

      {/* Gradient scrim for legible captions */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/45 to-ink/65" />
      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_120%,rgba(237,95,31,0.25),transparent)]" />

      <Container className="relative z-10 text-start">
        <Reveal direction="up">
          <p className="mb-3 font-body text-sm font-semibold uppercase tracking-[0.25em] text-orange">
            {t("aswan.kicker")}
          </p>
          <h2 className="font-display text-hero font-extrabold leading-[1.05] text-cream drop-shadow">
            {t("aswan.title")}
          </h2>
          <p className="mt-4 max-w-xl font-body text-lead text-cream/85">
            {t("aswan.caption")}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
