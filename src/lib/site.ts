/** Site-wide structural config: nav targets, section order, social links. */

export const NAV_ITEMS = [
  { id: "about", key: "nav.about" },
  { id: "program", key: "nav.program" },
  { id: "reviews", key: "nav.reviews" },
  { id: "booking", key: "nav.booking" },
  { id: "contact", key: "nav.contact" },
] as const;

/** All anchor targets top→bottom (used by the scroll-spy). */
export const SECTION_IDS = [
  "home",
  "about",
  "program",
  "reviews",
  "booking",
  "contact",
] as const;

export const SOCIALS = [
  { name: "facebook", href: "https://www.facebook.com/RabieTours", labelKey: "a11y.facebook" },
  { name: "instagram", href: "https://www.instagram.com/rabietours", labelKey: "a11y.instagram" },
  { name: "tiktok", href: "https://www.tiktok.com/@rabietours", labelKey: "a11y.tiktok" },
] as const;

export type SocialName = (typeof SOCIALS)[number]["name"];
