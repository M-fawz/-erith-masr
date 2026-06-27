import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Program } from "@/sections/Program";
import { Aswan } from "@/sections/Aswan";
import { Reviews } from "@/sections/Reviews";
import { Explore } from "@/sections/Explore";
import { Booking } from "@/sections/Booking";
import { Contact } from "@/sections/Contact";

export default function App() {
  const { t } = useTranslation();

  // Support deep-links to a section (#program, #booking…) on first load —
  // sections only exist after React mounts, so re-run the scroll here.
  useEffect(() => {
    if (!window.location.hash) return;
    const el = document.querySelector(window.location.hash);
    if (el) requestAnimationFrame(() => el.scrollIntoView({ behavior: "auto" }));
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
        <Program />
        <Aswan />
        <Reviews />
        <Explore />
        <Booking />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
