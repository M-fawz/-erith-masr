# CLAUDE.md — Erith Masr Project Memory & Architecture

> **Read this file at the start of EVERY session before writing any code.**
> It is your persistent memory. If you ever feel unsure what we are building
> or why, re-read this file and the three spec docs in `/docs`.
> When you make an important decision or finish a phase, append it to the
> **Decision Log** and **Build Checklist** at the bottom of this file.

---

## 1. What we are building (and why)

**Erith Masr (إرث مصر / "ERTH MASR")** is a bilingual (Arabic + English)
heritage-tourism marketing website for the Egyptian tour operator **Rabie
Tours**. Brand sub-slogan: **"خلوة يا بلدي"**.

The site sells curated cultural/heritage trips inside Egypt (with a strong
focus on Aswan & Nubia). A visitor lands on the site and should immediately
understand: *this company runs guided "journeys inside Egypt" that revive
awareness of authentic Egyptian heritage*, then be able to explore the trip
program, read reviews, and book.

**Our job:** Clone the provided 6-page design **pixel-faithfully first**,
then elevate it with motion, polish, and performance — without changing the
visual identity (same colors, fonts, layout, spacing).

The design source of truth is `/docs/web_2.pdf` (an Adobe Illustrator web
mockup, 6 artboards at 1920×1080). **Open and view it whenever a layout
detail is ambiguous.** The rasterized reference pages are also in
`/docs/reference-images/` if provided.

---

## 2. Tech stack (non-negotiable)

- **React 18 + Vite + TypeScript** (strict mode).
- **Tailwind CSS** for styling, driven by CSS custom properties (design
  tokens). Use **CSS logical properties** (`margin-inline`, `padding-inline`,
  `inset-inline`, `text-align: start`) everywhere so RTL/LTR "just works".
- **react-i18next** + `i18next-browser-languagedetector` for AR/EN.
- **Framer Motion** (`motion`) for animation + scroll-triggered reveals and
  the SVG route-draw animation.
- **react-router-dom** is optional — the site is a single long landing page;
  nav links smooth-scroll to in-page section anchors. Only add routing if a
  page genuinely needs its own URL.
- Small helpers: `react-countup` (or a custom hook) for stat counters;
  `lucide-react` ONLY as a fallback for generic UI icons (search, social)
  when a matching brand icon is missing from `/icons`.
- Map: Google Maps `<iframe>` embed for the Rabie Tours location.

Do **not** introduce a UI kit (MUI, Chakra, etc.) or a CSS-in-JS runtime.
Keep the bundle lean.

---

## 3. Design tokens (summary — full detail in `/docs/DESIGN-SYSTEM.md`)

| Token            | Value     | Use                                    |
|------------------|-----------|----------------------------------------|
| `--sand`         | `#EFE3BB` | Page background                        |
| `--sand-deep`    | `#C6BA92` | Footer band / alternate section bg     |
| `--cream`        | `#FBF3E6` | Navbar, pills, light cards on sand     |
| `--card`         | `#FFFFFF` | White stat/review cards                |
| `--orange`       | `#ED5F1F` | Primary: headings, numbers, buttons    |
| `--teal`         | `#125163` | Secondary: route line, illustrations   |
| `--ink`          | `#1F1F1F` | Dark text & dark buttons               |
| `--star`         | `#E6A92C` | Rating stars                           |

**Fonts:** Arabic display → **Kufam Bold**; Arabic UI/body → **Cairo**;
Arabic editorial/naskh body (trip descriptions) → **Traditional Arabic**;
Latin display → **Acumin Variable Concept**; Latin/UI fallback → Cairo Latin;
`Nirmala UI` as a mixed-script fallback. See `/docs/DESIGN-SYSTEM.md` for the
exact `@font-face` map and the Tailwind `fontFamily` config.

---

## 4. Asset map

The client's raw assets live in these folders (copy them into the repo under
`public/assets/` or `src/assets/` and keep the names). **Inventory them
first** (`ls -R`) and build a mapping table before coding visuals.

| Source folder | Holds                                  | Used in                         |
|---------------|----------------------------------------|---------------------------------|
| `avater/`     | Review/testimonial people portraits    | Reviews section (4 cards)       |
| `backgrounds/`| Hero "island" montage, Aswan sunset photo, temple/governorate photos, palm watermark | Hero, Booking, optional Explore gallery |
| `icones/`     | Palm, sailboat, wheat, water-waves, Nubian house, temple columns, stat icons | Program section, About stats    |
| `logo/`       | "إرث مصر / ERTH MASR" mark + wordmark, "خلوة يا بلدي" calligraphy | Navbar, footer            |
| `video/`      | `intro.*` (home) and `aswan.*` (footage) | Hero / documentary section    |

If a needed icon is genuinely missing, prefer recreating it as inline SVG to
match the flat two-tone (orange + teal) style; use `lucide-react` only for
generic UI glyphs. Never block on a missing asset — stub it and log it.

**Video notes:**
- `intro.*` → background/intro media in the **Home/Hero** area, muted +
  autoplay + loop + `playsinline`, with a poster image, lazy-played via
  IntersectionObserver.
- `aswan.*` → the client's own footage; **orientation is wrong and must be
  corrected with a CSS transform**. Expose it as a CSS variable
  `--aswan-rotate` (start at `-45deg`, the client will fine-tune) plus
  `object-fit: cover` inside a fixed-aspect frame so the rotation never
  reveals empty corners. Suggested placement: a full-bleed **"حكاية أسوان /
  The Story of Aswan"** documentary-style section between Program and Reviews
  (gentle Ken-Burns zoom, muted loop, optional captions). Confirm placement
  with the client if unsure.

---

## 5. Core conventions

- **Bilingual from day one.** Every visible string comes from
  `src/i18n/locales/ar.json` / `en.json`. No hardcoded copy in components.
  The AR copy is the source of truth (taken verbatim from the PDF); EN is in
  `/docs/CONTENT-AND-PAGES.md`.
- **Direction:** a language toggle updates `i18n.language`, and an effect
  sets `document.documentElement.lang` and `dir` (`rtl` for AR, `ltr` for
  EN). Layout must mirror cleanly — test BOTH directions for every section.
- **Default language = Arabic, default dir = RTL.**
- **Motion respects `prefers-reduced-motion`** — gate every non-essential
  animation behind it.
- **Accessibility:** semantic landmarks, alt text (bilingual), visible focus
  states, AA contrast, keyboard-navigable nav + forms, labelled inputs.
- **Performance budget:** see Build Checklist. Lazy-load below-the-fold
  images/sections, compress + poster the videos, `font-display: swap`,
  preload the two most-used fonts, code-split heavy sections.
- **Commits:** small and per-section. Keep `npm run build` green.

---

## 6. How to work

1. Re-read this file + `/docs/DESIGN-SYSTEM.md` + `/docs/CONTENT-AND-PAGES.md`.
2. Follow `/docs/BUILD-PLAN.md` phase by phase. Don't skip ahead.
3. Use your **frontend-design skill** for the polish pass, but stay 100%
   faithful to the existing brand identity — this is a clone, not a redesign.
4. After each phase: run the app, screenshot/verify against the PDF in BOTH
   languages and at mobile + desktop widths, then tick the checklist and add
   a Decision Log entry.

---

## 7. Decision Log
<!-- Append newest at the top. Format: [YYYY-MM-DD] decision — reason. -->

- **[2026-06-28] Phase 2 complete (all 7 sections + Explore).** Built faithful
  to `docs/reference-images` in AR+EN, responsive. Reusables: Reveal/RevealGroup,
  LazyVideo (preload=none, play-on-view), StarRating (partial gold fill),
  StatCard (react-countup), ReviewCard, Field/TextAreaField, Ornament (✶),
  MaskIcon (recolors orange `columns.png` → teal). Program uses a **static
  central dashed route + nodes** for now; the winding scroll-draw path + sailboat
  travel is the Phase-3 signature. Booking/Contact are styled lead-capture only
  (client-side validation + animated success, no backend). Aswan uses the
  `.aswan-video` transform (single `--aswan-rotate` knob) + `.aswan-kenburns`.
  Program dest2 photo reuses `aswan-sunset.webp` (it shows the colorful Nubian
  village — no dedicated asset existed).
- **[2026-06-28] Deep-link + QA flag.** Added a mount effect so `/#section`
  deep-links scroll correctly in the SPA (sections mount after the browser
  processes the hash). Added `?nomotion=1` (read by usePrefersReducedMotion) to
  force final states for screenshots. Installed `puppeteer-core` (devDep, uses
  the system Chrome) — reliable per-section/element screenshots live in scratch
  `shoot.mjs`; copy to repo root to run (`node _shoot.mjs <out> <base> <lng> <w> <tag>`).

- **[2026-06-27] Deploy hardening.** `strictPort:false` on dev+preview (auto-
  jumps off 5111 instead of crashing); explicit `base:"/"`. Compressed all
  heavy images to **WebP** (hero-island 2.6MB→160KB w/ alpha; review portraits
  4–5MB→~100KB; aswan-sunset 1.9MB→204KB) and dropped unused spare avatars.
  `dist` is now **24 MB** (videos + fonts dominate), no `.mov`/`.pdf`, no
  console/asset errors in prod preview (AR+EN). README has a Deploy section.
  Use `.webp` for hero-island/aswan-sunset/avatars in Phase 2 components.

- **[2026-06-27] Phase 1 complete (layout shell).** Built `Navbar` (floating
  cream pill: logo · nav links · search pill · "خلوة يا بلدي" slogan · AR|EN
  toggle), sticky with scroll-shadow, scroll-spy active state, accessible
  mobile drawer (focus-trap-ish, Esc + body-lock). Built `Footer` (sand-deep
  band, brand + quick links + socials + copyright, teal sailboat motif).
  Smooth-scroll anchors via native hash + `scroll-padding-top`. Primitives:
  Container, Button (dark/orange/outline, motion press), Logo, BrandSlogan,
  LanguageToggle, Socials (inline-SVG FB/IG/TikTok), SectionTitle. Verified
  AR/RTL + EN/LTR at desktop and (effective) mobile.
- **[2026-06-27] Got the REAL design.** Client supplied rendered pages
  `docs/reference-images/01-hero…06-contact.jpg` (viewed) + the real hero
  composition `hero-island.png` (transparent: 3 men over a landmark island).
  Building to these, not guesses. Key facts captured in §9 below.
- **[2026-06-27] Real fonts self-hosted.** Client's font folder turned out
  empty on disk; Cairo/Kufam/Acumin were nowhere on the system. Self-hosted
  the genuine OFL releases of **Cairo + Kufam** (and **Archivo** as the Acumin
  Latin-display stand-in) into `public/assets/fonts/`, and copied the real
  **Traditional Arabic** (trado/tradbdo) + **Nirmala** from Windows Fonts.
  Replaced the Google-Fonts `<link>` with self-hosted `@font-face`
  (`font-display: swap`) + preload of Cairo/Kufam. Acumin (paid Adobe) has a
  ready commented `@font-face` block — drop the `.otf` in to switch.
- **[2026-06-27] Vercel-ready.** `vercel.json` (framework vite, build
  `vite build`, output `dist`, SPA rewrite). `.gitignore` excludes the 166 MB
  PDF + raw root asset folders. Dev/preview pinned to **port 5111**
  (`strictPort`, `host`). Watcher set to `usePolling` (the Arabic+space project
  path breaks chokidar on Windows, so HMR was silently dead without it).
  `npm run build` → clean **41 MB** `dist` (no `.mov`/`.pdf`); `npm run
  preview` verified.
- **[2026-06-27] Videos transcoded now (not Phase 4).** `aswan.mov` (97 MB,
  1280×2276/40s portrait — the wrong-orientation footage) → `aswan.mp4`
  (5.8 MB H.264) + `aswan.webm` (7.8 MB VP9), long side capped at 1080,
  muted, `+faststart`, with `aswan-poster.jpg`. `intro.mp4` kept (2.7 MB) +
  `intro-poster.jpg`. The `.mov` is deleted from `public/` so it never ships.
  webm came out larger than mp4 here, so list **mp4 first** in the Aswan
  `<video>`. Transcoded via `ffmpeg-static` (no system ffmpeg). Orientation
  still handled at display time by the single `--aswan-rotate` token.
- **[2026-06-27] Screenshot caveat.** Headless Chrome on this box has a
  ~478px minimum window width (Windows display scaling), so true <478px
  layouts can't be captured (they render at 478 and crop). Verify real phone
  widths in a browser devtools session; the CSS is responsive below 478.

- **[2026-06-27] Phase 0 complete.** Scaffolded Vite + React 18 + TS **in place**
  at the repo root (not a `erith-masr/` subfolder) since the repo root already
  holds the docs + asset folders. Scaffolded manually (wrote config files)
  rather than `npm create vite` because the dir was non-empty (interactive
  prompt can't be answered headless).
- **[2026-06-27] Fonts via Google Fonts.** The original licensed font files
  (Acumin Variable Concept, Traditional Arabic) were **not provided** in the
  package. Mapped roles to web fonts: Arabic display → **Kufam**, body → **Cairo**,
  naskh → **Amiri** (stands in for Traditional Arabic), Latin display →
  **Archivo** (stands in for Acumin). `src/styles/fonts.css` has commented
  `@font-face` blocks using `local()` so dropping the real TTF/OTF files into
  `public/assets/fonts/` later overrides the fallbacks with zero code changes.
- **[2026-06-27] PDF not rasterizable in this env.** `web 2.pdf` is 166 MB
  (> the 100 MB Read limit) and no ImageMagick / Ghostscript / Python / working
  pdftoppm is installed; Chrome headless renders PDFium as blank. Built
  faithfully from `DESIGN-SYSTEM.md` + `CONTENT-AND-PAGES.md` (which encode the
  PDF's layout/copy) plus direct inspection of every brand asset. Re-verify
  specific spacing if the client supplies reference images or a smaller PDF.
- **[2026-06-27] Hero composition.** No pre-made "floating island montage"
  asset (3 sepia men + landmark slab) exists. Decision: build the hero as a
  layered **floating collage** — the Aswan-sunset photo (`aswan-sunset.png`) as
  the centerpiece "island" card with smaller floating landmark cards + palm
  watermark + intro video softly behind. Captures the montage spirit on-brand.
  (Logged for client confirmation.)
- **[2026-06-27] Aswan footage = `.mov` (97 MB).** Kept as-is for Phase 0. It
  must be transcoded to `.mp4`/`.webm` + compressed + given a poster in Phase 4
  (QuickTime `.mov` won't decode in all browsers). Orientation handled via the
  single `--aswan-rotate` token (default `-45deg`) in `tokens.css`.

---

## 7.1 Concrete asset mapping (renamed into `public/assets/`)

| File (public/assets/…) | Source | Component / use |
|---|---|---|
| `logo/LOGO-final.png` | `logo/` | Navbar + footer brand lockup, favicon |
| `backgrounds/aswan-sunset.png` | `Firefly (1).png` | **Booking** tall sunset photo |
| `backgrounds/aswan-feluccas.jpg` | `ac823…jpg` | **Program** dest1 (Elephantine / Nile) |
| `backgrounds/abu-simbel.jpg` | `Abu Simbel.jpg` | Program dest3 photo + Explore gallery |
| `backgrounds/pharaonic-temple.jpg` | `معبد فرعوني.jpg` | Explore gallery |
| `backgrounds/balloons.jpg` | `البالونات الطائرة.jpg` | Explore gallery (Luxor) |
| `backgrounds/qaitbay.jpg` | `قلعة قايتباي.jpg` | Explore gallery + hero collage |
| `backgrounds/al-azhar.jpg` | `الأزهر الشريف.jpg` | Explore gallery |
| `backgrounds/montaza.jpg` | `قصر المنتزة.jpg` | Explore gallery |
| `backgrounds/alexandria.jpg` | `Alexandria.jpg` | Explore gallery + hero collage |
| `backgrounds/ibn-tulun.jpg` | `Ibn Toulun…jpg` | Explore gallery |
| `backgrounds/toutankhamun.jpg` | `tot ankh amon.jpg` | Explore gallery + hero collage |
| `backgrounds/nefertiti.jpg` | `Nefertiti.jpg` | Explore gallery + hero collage |
| `avatars/abu-salem.png` | `ابوسالم.png` | Review r1 (Abu Salem) |
| `avatars/ben-najah.jpg` | `ronaldo.jpg` | Review r2 (Ben Najah) — stand-in portrait |
| `avatars/hakim.png` | `حكيم.png` | Review r3 (Hakim Ziyech) |
| `avatars/abdullah.png` | `عبدالله.png` | Review r4 (Abdullah Ahmed) |
| `avatars/{adam,jon,marek}.{jpg,png}` | `avater/` | spare portraits |
| `icons/sailboat.png` | `…013408.png` | **Program route boat** (travels the path) ★ |
| `icons/palm.png` | `…013445.png` | Hero watermark + Elephantine icon |
| `icons/wheat.png` | `Untitled-3.png` | Elephantine icon (wheat, teal) |
| `icons/pottery.png` | `…013334.png` | Elephantine icon + hero accent |
| `icons/nubian-houses.png` | `Untitled-1.png` | Program dest2 (Nubian Village) icon |
| `icons/nubian-figure.png` | `…013427.png` | Program end-of-path avatar |
| `icons/columns.png` | `Untitled-2.png` | Program dest3 + footer band columns |
| `icons/temple-pylon.png` | `…013258.png` | Program dest3 / About stat icon |
| `icons/sunset-arch.png` | `…013315.png` | About stat icon / accent |
| `backgrounds/hero-island.png` | client (extracted from PDF) | **Hero composition** (3 men + landmark island, transparent) |
| `video/intro.mp4` (+ `intro-poster.jpg`) | `video/intro.mp4` | Hero background video (play-on-view) |
| `video/aswan.mp4` + `aswan.webm` (+ `aswan-poster.jpg`) | transcoded from `aswan.mov` | Aswan documentary (mp4 listed first) |

---

## 8. Build Checklist
<!-- Tick as you go: [x]. Keep this honest — it's how we resume safely. -->

### Phase 0 — Scaffold
- [x] Vite + React + TS project created, runs clean
- [x] Tailwind + tokens wired (`tokens.css`, `tailwind.config`)
- [x] Fonts installed + `@font-face` + `font-display: swap` (self-hosted real fonts; see Decision Log)
- [x] i18n configured (ar/en), dir + lang toggling works
- [x] Asset folders copied in and inventoried (mapping table written → §7.1)

### Phase 1 — Layout shell
- [x] Responsive Navbar (logo, search, nav links, lang toggle, active state)
- [x] Sticky/scroll behavior + mobile drawer
- [x] Footer / contact band
- [x] Smooth-scroll section anchors

### Phase 2 — Sections (pixel-faithful, both languages)
- [x] Hero (رحلة داخل مصر) + island composition + intro video
- [x] About (من نحن) + 4 stat cards with count-up
- [x] Trip Program (برنامج الرحلة) + dashed route _(static central route + nodes; winding scroll-draw + sailboat travel = Phase 3)_
- [x] Aswan documentary section (rotation-corrected video)
- [x] Reviews (التقييمات) — 4 staggered cards + star fill
- [x] Booking (احجز رحلتك الآن) form + Aswan image/social
- [x] Contact (اتصل بنا) form + map + info cards
- [x] _(bonus)_ Explore Egypt gallery (lazy-loaded landmark grid)

### Phase 3 — Motion
- [ ] Page-load staggered hero reveal
- [ ] Scroll-reveal for all sections (IntersectionObserver / whileInView)
- [ ] SVG route draws on scroll + sailboat travels the path
- [ ] Ornament/divider strokes draw in; count-up; star fill; hover micro-interactions
- [ ] `prefers-reduced-motion` honored everywhere

### Phase 4 — Polish & performance
- [ ] Mobile pass (360–430px) for every section, both dirs
- [ ] Image/video optimization + lazy loading + posters
- [ ] Lighthouse: Perf ≥ 90, A11y ≥ 95, Best-Practices ≥ 95
- [ ] Cross-browser + RTL/LTR final QA
- [ ] README for running/building the project

---

## 9. Design facts from `docs/reference-images/` (build Phase 2 to THESE)
<!-- Directions are RTL: inline-start = RIGHT, inline-end = LEFT. -->

**Navbar (all pages):** floating cream pill, full container width. R→L: logo
(orange square mark + "إرث مصر / ERTH MASR" wordmark) · nav links (من نحن ·
البرنامج · التقييمات · الحجز · اتصل بنا) · wide search pill ("البحث") · "خلوة يا
بلدي" orange calligraphy at far inline-start. Active link = **dark ink, bold**
(not orange); inactive links are a warm muted tone; brand/slogan are orange.

**1 · Hero (`01-hero`):** title `رحلة داخل مصر` huge ink Kufam, 3 lines, at the
inline-end (right); subtitle 2 lines; **dark** pill CTA `احجز الآن`. The
`hero-island.png` composition sits center/inline-start with a faint **orange
palm** watermark behind the men.

**2 · About (`02-about`):** orange title `من نحن` top inline-end. Three text
columns (R→L: intro · vision · mission), each led by a `•` bullet, justified
naskh. Then **4 white stat cards**: each has a thin **orange line icon** in the
top **inline-end** corner (User, Send/paper-plane, MapPin, BadgeCheck — use
lucide, NOT the flat color icons), a big orange number (10 · +500 · 25 · 10),
orange unit, orange caption. All card text orange.

**3 · Program (`03-program`) ★:** orange title `برنامج الرحلة` top inline-end;
teal felucca at top inline-start where a **winding dashed teal route** starts
and snakes down connecting 3 destinations that ALTERNATE sides:
dest1 إلفنتين = text/icons inline-start, photo inline-end;
dest2 القرية النوبية = photo inline-start, text inline-end;
dest3 أبو سمبل = text inline-start, photo inline-end.
Each title is orange flanked by dark ✶ ornaments; naskh body justified; a row
of small flat icons under each (dest1: wheat+waves+palm · dest2: 2 Nubian
houses · dest3: temple shapes). Small Nubian-figure stands at the path's end
(bottom inline-start). Footer band (`--sand-deep`): **teal** sailboat at
inline-start, two **dark** pills (`تحميل البرنامج` · `للحجز`) center, **teal**
columns at inline-end. (Note: `columns.png` asset is orange → tint teal.)

**5 · Reviews (`04-reviews`):** orange one-line heading at inline-end. Row of
**4 cards, zig-zag vertical offset** (1&3 higher, 2&4 lower). Each: large
rounded-square portrait (shadow) → orange bold name → grey (country) → big
orange rating (4.2/4.5) + gold star row (partial fill) → 2-line dark review.
No card background — photo+text float on sand.

**6 · Booking (`05-booking`):** tall **portrait** `aswan-sunset.png` at
inline-start (rounded, shadow, slight tilt). inline-end: orange title `احجز
رحلتك الآن`, subtitle, orange-bordered **email** + **password** fields with
orange labels above, full-width **orange** `الإرسال` button, dotted `تواصل
معانا` divider, 3 **orange** social buttons (black FB/IG/TikTok glyphs).

**7 · Contact (`06-contact`):** Google Map (Rabie Tours, El Agouza) at
inline-start. inline-end form: first+last name (2 cols) · phone · message
textarea (light grey fields, subtle orange border, orange labels) · **outline**
`Send message` button. Below, centered row of **4 info cards** (cream, orange
hairline) each with a **dark circular icon** (pin/phone/envelope/calendar),
orange title, dark detail: address · phones · email · working hours.
