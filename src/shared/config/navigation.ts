export interface NavLink {
  href: string;
  labelKey: string;
}

export interface ActionLink {
  href: string;
  labelKey: string;
}

export const primaryNav: readonly NavLink[] = [
  { href: "/expositores", labelKey: "exhibitors" },
  { href: "/agenda", labelKey: "agenda" },
  { href: "/mapa", labelKey: "map" },
  { href: "/sponsors", labelKey: "sponsors" },
  { href: "/contacto", labelKey: "contact" },
];

export const actionLinks: readonly ActionLink[] = [
  {
    href: "https://docs.google.com/forms/d/e/1FAIpQLSeNz-j7L7f5iFtcIJeFPjnZfYvwX2vZ6M6qLciiPlz5pE7G2A/viewform",
    labelKey: "businessRound",
  },
  {
    href: "https://docs.google.com/forms/d/e/1FAIpQLSdnKLh1lToW7_H_8yw_n93LD2deOkVy35kWANY7z96KA_yk9Q/viewform",
    labelKey: "suppliers",
  },
];

export const footerNav: readonly NavLink[] = [
  { href: "/", labelKey: "home" },
  { href: "/#sobre", labelKey: "about" },
  { href: "/expositores", labelKey: "exhibitors" },
  { href: "/agenda", labelKey: "agenda" },
  { href: "/mapa", labelKey: "map" },
  { href: "/ruta-ia", labelKey: "route" },
  { href: "/matchmaking", labelKey: "matchmaking" },
  { href: "/noticias", labelKey: "news" },
  { href: "/sponsors", labelKey: "sponsors" },
  { href: "/entradas", labelKey: "tickets" },
  { href: "/faq", labelKey: "faq" },
  { href: "/contacto", labelKey: "contact" },
];
