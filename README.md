# إرث مصر · ERTH MASR

Bilingual (Arabic / English) heritage-tourism marketing site for **Rabie
Tours** — a single long landing page that sells curated cultural journeys
inside Egypt (focus on Aswan & Nubia). Default language **Arabic / RTL**, with
a one-tap switch to **English / LTR**.

Built with **React 18 + Vite + TypeScript**, **Tailwind CSS** (design tokens),
**react-i18next**, and **Framer Motion**.

## Requirements

- Node.js ≥ 18 (developed on Node 24)

## Local development

```bash
npm install
npm run dev
```

The dev server prefers **http://localhost:5111** and auto-jumps to the next
free port (5112, 5113…) if it's busy — watch the terminal for the printed URL.

## Scripts

| Script            | What it does                                        |
|-------------------|-----------------------------------------------------|
| `npm run dev`     | Start the Vite dev server (HMR)                     |
| `npm run build`   | Type-check (`tsc --noEmit`) then `vite build` → `dist/` |
| `npm run preview` | Serve the production `dist/` build locally          |
| `npm run lint`    | Type-check only                                     |

## Project layout

```
src/
  components/   # Navbar, Footer, Button, Logo, LanguageToggle, Socials, …
  sections/     # (Phase 2) Hero, About, Program, Aswan, Reviews, Booking, Contact
  hooks/        # useScrollSpy, useScrolled, usePrefersReducedMotion
  i18n/         # index.ts + locales/ar.json + locales/en.json (all copy)
  lib/          # cn(), site config (nav items, socials)
  styles/       # tokens.css, fonts.css, globals.css
public/assets/  # fonts, logo, icons, backgrounds, avatars, video (shipped)
docs/           # reference-images + spec docs + web_2.pdf (reference only — NOT shipped)
```

## Tunables (for the client)

- **Aswan video** — the "حكاية أسوان" section plays the client's hand-edited,
  already-upright footage `public/assets/video/aswan-edit.mp4` (lossless-remuxed
  with `+faststart`; poster `aswan-edit-poster.jpg`). It loads only when scrolled
  into view (play-on-view) and has a play/pause button. No rotation/transform is
  applied. To swap in new footage, drop in an H.264/yuv420p mp4 and update the
  `<source>` in `src/sections/Aswan.tsx`.
- **Google Maps embed** — replace the Contact-section iframe `src` with the
  final Rabie Tours place-embed URL (search `TODO: map embed`).
- **Fonts** — Cairo, Kufam, Traditional Arabic ship self-hosted as **WOFF2** in
  `public/assets/fonts/` (Cairo + Kufam are preloaded). "Nirmala UI" is a
  system-only mixed-script fallback (not downloaded). **Acumin** (Latin display)
  is a paid Adobe font and ships as **Archivo** by default; drop
  `AcuminVariableConcept.otf` into `public/assets/fonts/` and uncomment the one
  `@font-face` block in `src/styles/fonts.css` to switch — no other code change.

## Performance

Optimized for production: WOFF2 fonts, WebP images with intrinsic dimensions,
videos deferred (the hero ambience mounts on first interaction; the Aswan video
is play-on-view), and below-the-fold sections are code-split (`React.lazy`) and
deferred-mounted (`LazyMount`) so `framer-motion` stays off the first-paint path.

Lighthouse (mobile, served gzip like production): **Accessibility 100,
Best-Practices 100, SEO 100**, Performance ~76 with CLS 0, FCP ~1.8 s, TBT
~0.3 s. The remaining Performance gap is **LCP (~4.4 s)** — inherent to a
client-rendered SPA under Lighthouse's simulated 4× CPU / slow-4G (the hero image
is preloaded and downloads in ~30 ms but can't paint until the JS executes;
real-device/field LCP is markedly better). Reaching Perf ≥ 90 would require
**prerendering/SSG** (serve the hero in static HTML, then hydrate) — a small
architecture change kept out of this pass pending sign-off.

## Deploy (Vercel)

This is a static SPA. No environment variables or backend are required.

- **Framework preset:** Vite
- **Build command:** `vite build` (or `npm run build`)
- **Output directory:** `dist`
- **Install command:** `npm install`
- **Env vars:** none

`vercel.json` at the repo root pins these and adds an SPA rewrite so client
refreshes resolve to `index.html`:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

> `docs/web_2.pdf` (≈166 MB) and the raw source asset folders are git-ignored
> and reference-only — they are never built or deployed. Only `dist/` ships.

### One-time deploy from this folder

```bash
npm i -g vercel        # if you don't have the CLI
vercel login
vercel                 # follow prompts → creates a Preview deployment
vercel --prod          # promote to Production
```

Or push the repo to GitHub and "Import Project" in the Vercel dashboard — it
auto-detects Vite and uses the settings above.
