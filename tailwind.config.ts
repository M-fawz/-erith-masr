import type { Config } from "tailwindcss";

/**
 * Tokens are defined in src/styles/tokens.css as CSS custom properties and
 * mirrored here so Tailwind utilities (bg-orange, text-teal, font-display…)
 * resolve to the same single source of truth. RTL/LTR "just works" because we
 * author layout with logical-property utilities (ps-/pe-/ms-/me-/start-/end-).
 */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sand: "var(--sand)",
        "sand-deep": "var(--sand-deep)",
        cream: "var(--cream)",
        card: "var(--card)",
        orange: {
          DEFAULT: "var(--orange)",
          600: "var(--orange-600)",
        },
        teal: {
          DEFAULT: "var(--teal)",
          600: "var(--teal-600)",
        },
        ink: {
          DEFAULT: "var(--ink)",
          soft: "var(--ink-soft)",
          sand: "var(--ink-on-sand)",
        },
        star: {
          DEFAULT: "var(--star)",
          empty: "var(--star-empty)",
        },
        line: "var(--line)",
      },
      fontFamily: {
        display: "var(--font-display)",
        body: "var(--font-body)",
        naskh: "var(--font-naskh-ar)",
      },
      fontSize: {
        hero: "var(--fs-hero)",
        h2: "var(--fs-h2)",
        h3: "var(--fs-h3)",
        stat: "var(--fs-stat)",
        lead: "var(--fs-lead)",
        body: "var(--fs-body)",
      },
      borderRadius: {
        pill: "var(--radius-pill)",
        card: "var(--radius-card)",
        input: "var(--radius-input)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
        soft: "var(--shadow-soft)",
      },
      maxWidth: {
        container: "var(--container)",
      },
      spacing: {
        section: "var(--section-py)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(-6px)" },
          "50%": { transform: "translateY(6px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
        shimmer: "shimmer 2.4s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
