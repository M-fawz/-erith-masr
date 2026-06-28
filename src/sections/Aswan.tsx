import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pause, Play } from "lucide-react";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function Aswan() {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const reduced = usePrefersReducedMotion();

  // Play-on-view: the (multi-MB) video only fetches + plays once scrolled near,
  // so it never loads during the initial page paint. Reduced-motion keeps the
  // poster frame. The button below still toggles playback manually.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (reduced) {
      v.pause();
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (v.preload !== "auto") v.preload = "auto";
          void v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reduced]);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <section
      id="aswan"
      className="relative flex min-h-[70vh] scroll-mt-28 items-end overflow-hidden bg-ink py-16 md:min-h-[80vh]"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover aswan-kenburns"
        poster="/assets/video/aswan-edit-poster.jpg"
        muted
        loop
        playsInline
        preload="none"
        aria-label={t("aswan.title")}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <source src="/assets/video/aswan-edit.mp4" type="video/mp4" />
      </video>

      {/* Scrim for legible captions */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-ink/55" />
      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_120%,rgba(237,95,31,0.22),transparent)]" />

      <Container className="relative z-10 flex items-end justify-between gap-6">
        <Reveal direction="up" className="text-start">
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

        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? t("a11y.pauseVideo") : t("a11y.playVideo")}
          aria-pressed={playing}
          className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-cream/90 text-ink shadow-card backdrop-blur transition-transform duration-200 hover:scale-105 hover:bg-cream"
        >
          {playing ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6 translate-x-[1px]" />
          )}
        </button>
      </Container>
    </section>
  );
}
