import { Suspense, lazy, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LazyMount } from "@/components/LazyMount";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";

// Below-the-fold sections are code-split so the initial bundle only carries the
// navbar + hero + about. Vite emits a modulepreload for each, so they stream in
// right after first paint with negligible delay.
const Program = lazy(() => import("@/sections/Program").then((m) => ({ default: m.Program })));
const Aswan = lazy(() => import("@/sections/Aswan").then((m) => ({ default: m.Aswan })));
const Reviews = lazy(() => import("@/sections/Reviews").then((m) => ({ default: m.Reviews })));
const Explore = lazy(() => import("@/sections/Explore").then((m) => ({ default: m.Explore })));
const Booking = lazy(() => import("@/sections/Booking").then((m) => ({ default: m.Booking })));
const Contact = lazy(() => import("@/sections/Contact").then((m) => ({ default: m.Contact })));

/** Space-reserving placeholder while a lazy section's chunk resolves (limits CLS). */
function SectionFallback({ minH = "60vh" }: { minH?: string }) {
  return <div aria-hidden="true" style={{ minHeight: minH }} />;
}

export default function App() {
  const { t } = useTranslation();

  // Support deep-links to a section (#program, #booking…) on first load. Lazy
  // sections mount a tick after React, so poll briefly until the target exists.
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    let tries = 0;
    const tick = () => {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: "auto" });
      } else if (tries++ < 40) {
        window.setTimeout(tick, 50);
      }
    };
    requestAnimationFrame(tick);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[60] focus:rounded-pill focus:bg-ink focus:px-5 focus:py-2 focus:text-white"
      >
        {t("nav.skip")}
      </a>

      <Navbar />

      <main id="main">
        <Hero />
        <About />
        {/* Below-the-fold: deferred until scrolled near (keeps their JS +
            framer-motion off the initial-load main thread). */}
        <LazyMount id="program" minHeight="120vh">
          <Suspense fallback={<SectionFallback minH="120vh" />}>
            <Program />
          </Suspense>
        </LazyMount>
        <LazyMount id="aswan" minHeight="70vh">
          <Suspense fallback={<SectionFallback minH="70vh" />}>
            <Aswan />
          </Suspense>
        </LazyMount>
        <LazyMount id="reviews" minHeight="80vh">
          <Suspense fallback={<SectionFallback minH="80vh" />}>
            <Reviews />
          </Suspense>
        </LazyMount>
        <LazyMount id="explore" minHeight="80vh">
          <Suspense fallback={<SectionFallback minH="80vh" />}>
            <Explore />
          </Suspense>
        </LazyMount>
        <LazyMount id="booking" minHeight="80vh">
          <Suspense fallback={<SectionFallback minH="80vh" />}>
            <Booking />
          </Suspense>
        </LazyMount>
        <LazyMount id="contact" minHeight="90vh">
          <Suspense fallback={<SectionFallback minH="90vh" />}>
            <Contact />
          </Suspense>
        </LazyMount>
      </main>

      <Footer />
    </>
  );
}
