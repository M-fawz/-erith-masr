import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export type VideoSource = { src: string; type: string };

/**
 * Muted, looping, playsinline background video that only loads + plays when
 * scrolled into view (IntersectionObserver, preload="none"). Shows the poster
 * when paused / reduced-motion. List the smallest-encoded source first.
 */
export function LazyVideo({
  sources,
  poster,
  className,
  videoClassName,
  ariaLabel,
}: {
  sources: VideoSource[];
  poster?: string;
  className?: string;
  videoClassName?: string;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (reduced) return; // honor reduced-motion: stay on the poster frame

    let io: IntersectionObserver | undefined;
    const start = () => {
      io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            if (v.preload === "none") v.preload = "auto";
            void v.play().catch(() => {});
          } else {
            v.pause();
          }
        },
        { threshold: 0.25 },
      );
      io.observe(v);
    };

    // Defer fetching/playing the (decorative) video until the page has finished
    // loading its critical content, so it never competes with the LCP image.
    let raf = 0;
    if (document.readyState === "complete") {
      raf = window.requestAnimationFrame(start);
    } else {
      window.addEventListener("load", start, { once: true });
    }
    return () => {
      window.removeEventListener("load", start);
      if (raf) cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, [reduced]);

  return (
    <div className={cn("overflow-hidden", className)}>
      <video
        ref={ref}
        className={videoClassName}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={ariaLabel}
        aria-hidden={ariaLabel ? undefined : true}
        tabIndex={-1}
      >
        {sources.map((s) => (
          <source key={s.src} src={s.src} type={s.type} />
        ))}
      </video>
    </div>
  );
}
