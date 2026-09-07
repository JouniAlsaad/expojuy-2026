import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { footerNav, siteContact, socialLinks } from "@/shared/config";
import { SocialIcon } from "@/shared/ui/social-icon";

export async function SiteFooter() {
  const t = await getTranslations("footer");
  const nav = await getTranslations("nav");
  const a11y = await getTranslations("a11y");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-2 md:px-8 lg:grid-cols-3">
        <div className="space-y-4 md:col-span-2 lg:col-span-1">
          <Image
            src="/brand/expojuy-logo.svg"
            alt="ExpoJuy 2026 — Feria multisectorial del NOA"
            width={376}
            height={243}
            unoptimized
            className="h-16 w-auto dark:hidden"
          />
          <Image
            src="/brand/expojuy-logo-dark.svg"
            alt="ExpoJuy 2026 — Feria multisectorial del NOA"
            width={376}
            height={243}
            unoptimized
            className="hidden h-16 w-auto dark:block"
          />
          <p className="max-w-xs text-sm text-muted-foreground">{t("about")}</p>
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.platform}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={a11y(social.labelKey)}
                className="text-muted-foreground transition-colors hover:text-brand-text"
              >
                <SocialIcon platform={social.platform} className="size-5" />
              </a>
            ))}
          </div>
        </div>

        <nav className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground">{t("sections")}</h2>
          <ul className="grid grid-cols-2 gap-x-8 gap-y-2">
            {footerNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {nav(link.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-foreground">{t("contactTitle")}</h2>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              <a
                href={`mailto:${siteContact.email}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
              >
                <Mail className="size-4 shrink-0" aria-hidden />
                {siteContact.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${siteContact.phoneHref}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
              >
                <Phone className="size-4 shrink-0" aria-hidden />
                {siteContact.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${siteContact.whatsappHref}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 transition-colors hover:text-foreground"
              >
                <MessageCircle className="size-4 shrink-0" aria-hidden />
                {siteContact.whatsappDisplay}
              </a>
            </li>
            <li className="inline-flex items-start gap-2">
              <MapPin className="size-4 shrink-0" aria-hidden />
              <span>{t("address")}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 md:flex-row md:items-center md:justify-between md:px-8">
          <p className="text-xs text-muted-foreground">{t("copyright", { year })}</p>
          <p className="text-xs text-muted-foreground">{t("credit")}</p>
        </div>
      </div>
    </footer>
  );
}
