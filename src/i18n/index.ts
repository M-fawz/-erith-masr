import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import ar from "./locales/ar.json";
import en from "./locales/en.json";

export const SUPPORTED_LANGS = ["ar", "en"] as const;
export type Lang = (typeof SUPPORTED_LANGS)[number];

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      ar: { translation: ar },
      en: { translation: en },
    },
    fallbackLng: "ar",
    supportedLngs: SUPPORTED_LANGS as unknown as string[],
    nonExplicitSupportedLngs: true,
    load: "languageOnly",
    interpolation: { escapeValue: false },
    detection: {
      // `?lng=en` deep-links a language; otherwise remembered choice → AR.
      order: ["querystring", "localStorage", "htmlTag", "navigator"],
      lookupQuerystring: "lng",
      lookupLocalStorage: "erith-lang",
      caches: ["localStorage"],
    },
  });

/** Keep <html lang/dir> in sync with the active language. */
export function applyDirection(lang: string) {
  const isAr = lang.startsWith("ar");
  const root = document.documentElement;
  root.lang = isAr ? "ar" : "en";
  root.dir = isAr ? "rtl" : "ltr";
}

applyDirection(i18n.language || "ar");
i18n.on("languageChanged", applyDirection);

export default i18n;
