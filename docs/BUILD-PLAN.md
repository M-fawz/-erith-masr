# BUILD-PLAN.md — Erith Masr

Execute in order. Keep `npm run build` green and tick the checklist in
`CLAUDE.md` after each phase.

---

## Phase 0 — Scaffold & foundations

```bash
# 1) Create the app
npm create vite@latest erith-masr -- --template react-ts
cd erith-masr

# 2) Core deps
npm install react-i18next i18next i18next-browser-languagedetector \
            framer-motion react-countup lucide-react clsx

# 3) Tailwind (v3) + PostCSS
npm install -D tailwindcss@^3 postcss autoprefixer
npx tailwindcss init -p

# 4) Run
npm run dev
```

Then:
- Add the design tokens → `src/styles/tokens.css`; import in `main.tsx`.
- Add `@font-face` for every font file → `src/styles/fonts.css`; preload Cairo
  Regular + Kufam Bold in `index.html`; set `font-display: swap`.
- Configure `tailwind.config.ts`: map `colors` and `fontFamily` to the CSS
  variables from DESIGN-SYSTEM.md; enable logical-property utilities (use the
  built-in `ps-/pe-/ms-/me-/start-/end-/text-start` etc.).
- Set `<html lang="ar" dir="rtl">` as the default in `index.html`.
- i18n: `src/i18n/index.ts` + `locales/ar.json` + `locales/en.json` (seed from
  CONTENT-AND-PAGES.md). Add the dir/lang sync effect.
- Copy client asset folders into the repo:
  ```
  public/assets/avatars/      <- from avater/
  public/assets/backgrounds/  <- from backgrounds/
  public/assets/icons/        <- from icones/
  public/assets/logo/         <- from logo/
  public/assets/video/        <- from video/   (intro.*, aswan.*)
  ```
- `ls -R public/assets` and write the **asset mapping table** into CLAUDE.md
  (which file → which component).

**Target folder structure**
```
src/
  assets/fonts/
  components/      # Navbar, Footer, LanguageToggle, Button, Pill, Field,
                  # SectionTitle, OrnamentDivider, StatCard, ReviewCard,
                  # DestinationBlock, AnimatedRoute, VideoFrame
  sections/       # Hero, About, Program, Aswan, Reviews, Booking, Contact
  hooks/          # useInView, useCountUp, useScrollProgress, useReducedMotion
  i18n/           # index.ts, locales/ar.json, locales/en.json
  styles/         # tokens.css, fonts.css, globals.css
  App.tsx
  main.tsx
```

---

## Phase 1 — Layout shell
- `Navbar` (logo, search pill, nav links w/ active state, AR|EN toggle,
  mobile drawer), sticky on scroll with a subtle shadow when scrolled.
- `Footer` / contact band.
- App composes the section anchors in order; nav links smooth-scroll to them.
- Verify RTL ↔ LTR mirroring of the whole shell.

---

## Phase 2 — Sections (build static + faithful first, both languages)
Order: Hero → About → Program → Aswan → Reviews → Booking → Contact.
For each: match the PDF layout, pull copy from i18n, wire assets, make it
responsive (desktop → tablet → mobile), verify in AR and EN.

---

## Phase 3 — Motion (add after layout is correct)
- Global: a `Reveal` wrapper (Motion `whileInView`, `viewport once`) for
  consistent scroll reveals; a `useReducedMotion` gate.
- Hero load stagger + island float + intro video.
- About: stat count-up on view.
- **Program: SVG route draw-on-scroll + sailboat path-follow + per-card
  reveal + ornament stroke draw** (the signature moment — get this right).
- Aswan: Ken-Burns + rotation-corrected video.
- Reviews: staggered cards + star fill.
- Booking/Contact: field + media reveals, focus states, button micro-interactions.
- Verify `prefers-reduced-motion` disables non-essential motion.

---

## Phase 4 — Polish & performance
- Mobile pass 360–430px for every section in both directions.
- Images: responsive sizes, lazy-load below the fold, modern formats where
  possible; videos: compress, add `poster`, `preload="none"`, play-on-view.
- Code-split heavy sections; preload only critical fonts.
- Lighthouse targets: **Perf ≥ 90, A11y ≥ 95, Best-Practices ≥ 95**.
- Final cross-browser + RTL/LTR QA against the PDF.
- Write the project `README.md` (run/build/deploy + where to tune
  `--aswan-rotate` and the map embed URL).

---

## Definition of done
1. All 6 PDF sections reproduced faithfully (colors, fonts, spacing, layout).
2. Full AR/EN with correct RTL/LTR everywhere.
3. The animated sailing route works on scroll.
4. Both videos integrated; `aswan` orientation corrected & tunable.
5. Smooth on mobile and desktop; Lighthouse targets met.
6. CLAUDE.md checklist fully ticked + Decision Log updated.

## Open items to confirm with the client
- Exact placement of the `aswan` video (own documentary section vs. booking
  media) and the final rotation angle.
- Whether the Booking email/password block is a real auth flow or a styled
  lead-capture (default: lead-capture, no backend).
- Final Google Maps embed URL for the Contact section.
- Whether to add the optional "Explore Egypt" gallery.
