export interface ContactChannel {
  email: string;
  phoneDisplay: string;
  phoneHref: string;
  whatsappDisplay: string;
  whatsappHref: string;
}

export const siteContact: ContactChannel = {
  email: "expojuy2.0@gmail.com",
  phoneDisplay: "+54 388 4233539",
  phoneHref: "+543884233539",
  whatsappDisplay: "+54 388 4212955",
  whatsappHref: "543884212955",
};

export interface SocialLink {
  platform: "instagram" | "facebook" | "youtube" | "x";
  href: string;
  labelKey: string;
}

export const socialLinks: readonly SocialLink[] = [
  { platform: "instagram", href: "https://www.instagram.com/expojuy/", labelKey: "instagram" },
  { platform: "facebook", href: "https://www.facebook.com/expojuy/", labelKey: "facebook" },
];
