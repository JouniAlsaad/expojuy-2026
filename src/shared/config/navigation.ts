export interface NavLink {
  href: string;
  labelKey: string;
}

export const primaryNav: readonly NavLink[] = [
  { href: "/expositores", labelKey: "exhibitors" },
  { href: "/agenda", labelKey: "agenda" },
  { href: "/mapa", labelKey: "map" },
  { href: "/noticias", labelKey: "news" },
  { href: "/sponsors", labelKey: "sponsors" },
  { href: "/entradas", labelKey: "tickets" },
  { href: "/faq", labelKey: "faq" },
  { href: "/contacto", labelKey: "contact" },
];

export const footerNav: readonly NavLink[] = [
  { href: "/", labelKey: "home" },
  { href: "/#sobre", labelKey: "about" },
  { href: "/expositores", labelKey: "exhibitors" },
  { href: "/agenda", labelKey: "agenda" },
  { href: "/mapa", labelKey: "map" },
  { href: "/ruta-ia", labelKey: "route" },
  { href: "/noticias", labelKey: "news" },
  { href: "/sponsors", labelKey: "sponsors" },
  { href: "/entradas", labelKey: "tickets" },
  { href: "/faq", labelKey: "faq" },
  { href: "/contacto", labelKey: "contact" },
];
