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

- **Aswan video orientation** — the client footage is rotated; correct it with
  a single CSS variable in `src/styles/tokens.css`:
  ```css
  --aswan-rotate: -45deg; /* fine-tune in one place */
  ```
- **Google Maps embed** — replace the Contact-section iframe `src` with the
  final Rabie Tours place-embed URL (search `TODO: map embed`).
- **Fonts** — Cairo, Kufam, Traditional Arabic and Nirmala are self-hosted in
  `public/assets/fonts/`. **Acumin** (Latin display) is a paid Adobe font and
  ships as **Archivo** by default; drop `AcuminVariableConcept.otf` into
  `public/assets/fonts/` and uncomment the one `@font-face` block in
  `src/styles/fonts.css` to switch — no other code change needed.

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
