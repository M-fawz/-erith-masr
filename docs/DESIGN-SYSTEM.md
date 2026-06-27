# DESIGN-SYSTEM.md — Erith Masr

Exact, build-ready design tokens extracted from the source PDF. Treat these
as the single source of truth. Put them in `src/styles/tokens.css` and mirror
them in `tailwind.config.ts`.

---

## 1. Color tokens

```css
:root {
  /* Surfaces */
  --sand:        #EFE3BB;  /* default page background */
  --sand-deep:   #C6BA92;  /* footer band / alt section background */
  --cream:       #FBF3E6;  /* navbar, search pill, light cards on sand */
  --card:        #FFFFFF;  /* white stat / review cards */

  /* Brand */
  --orange:      #ED5F1F;  /* PRIMARY: headings, numbers, primary buttons */
  --orange-600:  #D5501A;  /* hover/pressed for orange */
  --teal:        #125163;  /* SECONDARY: route line, flat illustrations */
  --teal-600:    #0E4250;

  /* Ink / text */
  --ink:         #1F1F1F;  /* dark text + dark (navy/black) buttons */
  --ink-soft:    #3A3A38;  /* secondary body text */
  --ink-on-sand: #2B2A26;  /* body copy on sand background */

  /* Misc */
  --star:        #E6A92C;  /* rating stars (filled) */
  --star-empty:  #CDBE8E;
  --line:        rgba(31,31,31,0.12); /* hairlines / input borders */
  --white:       #FFFFFF;
}
```

**Usage rules (from the design):**
- Page background is always `--sand`. The footer band and the Booking/Contact
  forms sit on the same sand; the Program footer strip uses `--sand-deep`.
- All H1/H2 section titles and all big numbers are `--orange`.
- Primary CTAs: the hero "Book now" is **dark** (`--ink`) with white text;
  the Booking "Send" and other primary form buttons are **orange**
  (`--orange`) with white text. Match the PDF per-button (see CONTENT doc).
- Body copy on sand = `--ink-on-sand`. Cards use `--ink` on white.
- Route line, sailboat, columns, Nubian-house icons = `--teal`.

---

## 2. Fonts

Place the font files in `src/assets/fonts/` and declare them in
`src/styles/fonts.css`. Use `font-display: swap`. Preload **Cairo Regular**
and **Kufam Bold** (most used).

| Family (CSS)            | Files                                                  | Role |
|-------------------------|--------------------------------------------------------|------|
| `Kufam`                 | `ArbFONTS-Kufam-Bold.ttf` (700), `ArbFONTS-Kufam-Regular-1.ttf` (400) | **Arabic display** — section titles, brand-y headings |
| `Cairo`                 | `Cairo-Light.ttf` (300), `Cairo-Regular.ttf` (400), `Cairo-SemiBold.ttf` (600), `Cairo-Bold_0.ttf` (700) | **Arabic UI/body**, stat labels, buttons, nav |
| `Traditional Arabic`    | `trado.ttf` (400), `tradbdo.ttf` (700)                 | **Arabic editorial naskh** — trip-program descriptions |
| `Acumin`                | `AcuminVariableConcept.otf`                            | **Latin display** — EN headings, "ERTH MASR" wordmark |
| `Nirmala`               | `Nirmala.ttc`                                          | mixed-script fallback only |

```css
/* fonts.css (pattern — repeat per weight/file) */
@font-face{
  font-family:"Kufam"; src:url("/assets/fonts/ArbFONTS-Kufam-Bold.ttf") format("truetype");
  font-weight:700; font-style:normal; font-display:swap;
}
/* ...declare every file above the same way... */
```

**Font role mapping (CSS variables):**
```css
:root{
  --font-display-ar: "Kufam", "Cairo", system-ui, sans-serif;
  --font-body-ar:    "Cairo", system-ui, sans-serif;
  --font-naskh-ar:   "Traditional Arabic", "Cairo", serif;
  --font-display-lat:"Acumin", "Cairo", system-ui, sans-serif;
  --font-body-lat:   "Cairo", "Acumin", system-ui, sans-serif;
}
/* When <html dir="rtl"> use the AR families; dir="ltr" use Latin families. */
html[dir="rtl"]{ --font-display: var(--font-display-ar); --font-body: var(--font-body-ar); }
html[dir="ltr"]{ --font-display: var(--font-display-lat); --font-body: var(--font-body-lat); }
```

Tailwind config:
```ts
fontFamily: {
  display: "var(--font-display)",
  body:    "var(--font-body)",
  naskh:   "var(--font-naskh-ar)",
}
```

---

## 3. Type scale (responsive, clamp-based)

Headings use `--font-display` (orange where the design shows orange titles).
Hero title is the largest; trip-program body uses `--font-naskh-ar`.

```css
--fs-hero:    clamp(2.75rem, 6vw + 1rem, 6rem);   /* "رحلة داخل مصر" */
--fs-h2:      clamp(1.75rem, 2.5vw + 1rem, 3rem);  /* section titles */
--fs-h3:      clamp(1.25rem, 1.2vw + 0.9rem, 1.9rem); /* destination titles */
--fs-stat:    clamp(2.5rem, 4vw + 1rem, 4.5rem);   /* big numbers 10/+500/25 */
--fs-lead:    clamp(1.05rem, 0.6vw + 0.9rem, 1.4rem); /* hero subtitle */
--fs-body:    clamp(0.95rem, 0.3vw + 0.85rem, 1.1rem);
--fs-small:   0.85rem;
```
Line-height: headings `1.1–1.2`, body `1.7–1.9` for Arabic naskh comfort.

---

## 4. Spacing, radius, shadow

```css
--radius-pill:  999px;   /* search field, nav pill, hero CTA */
--radius-card:  22px;    /* stat & review cards, photos */
--radius-input: 14px;    /* form inputs */
--shadow-card:  0 18px 40px -18px rgba(31,31,31,0.25);
--shadow-soft:  0 8px 24px -12px rgba(31,31,31,0.18);
--section-py:   clamp(3.5rem, 6vw, 7rem);  /* vertical section padding */
--container:    min(1280px, 92vw);
```

Cards are generously rounded (~22px) with soft, low shadows. The search field
and CTAs are full pills. Photos in the program/booking sections have the same
card radius and a subtle shadow.

---

## 5. RTL / LTR strategy

1. Default `document.documentElement` = `lang="ar" dir="rtl"`.
2. The language toggle calls `i18n.changeLanguage()`, and an effect syncs:
   ```ts
   useEffect(() => {
     const isAr = i18n.language.startsWith("ar");
     document.documentElement.lang = isAr ? "ar" : "en";
     document.documentElement.dir  = isAr ? "rtl" : "ltr";
   }, [i18n.language]);
   ```
3. **Author all layout with logical properties** (`ps-/pe-`, `ms-/me-`,
   `start-/end-`, `text-start`) so mirroring is automatic. Avoid hard
   left/right except for things that must not mirror (e.g. the Latin "ERTH
   MASR" wordmark, phone numbers, the map).
4. Icons that imply direction (arrows, the sailboat travel direction) should
   flip with `dir`. Decorative ornaments are symmetric — no flip needed.
5. Numbers: keep Western Arabic numerals (1,2,3) as in the PDF; the design
   uses them for stats and ratings.

---

## 6. Component primitives to build

- `<SectionTitle/>` — orange display heading, optional ✶ ornament dividers
  (inline SVG, two-tone) on each side; ornaments animate-draw on reveal.
- `<Pill/>` — rounded search/nav/CTA container.
- `<Button variant="dark|orange|outline"/>`.
- `<StatCard icon number unit caption/>` (white card, orange number, count-up).
- `<ReviewCard photo name country rating text/>` (rounded photo, orange name,
  orange rating + gold stars).
- `<DestinationBlock side="start|end" title text icons photo/>` used by the
  Program timeline.
- `<AnimatedRoute/>` — the SVG dashed teal path + traveling sailboat.
- `<LanguageToggle/>` — AR/EN switch in the navbar.
- `<Field/>` / `<TextArea/>` — labelled, RTL-aware form controls.

Keep them all token-driven; no magic numbers.
