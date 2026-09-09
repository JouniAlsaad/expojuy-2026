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
    <footer className="bg-secondary text-neutral-200">
      <div className="mx-auto grid max-w-8xl gap-10 px-4 pt-8 pb-14 md:grid-cols-2 md:px-8 lg:grid-cols-4">
        <div className="flex flex-col items-center gap-4 text-center">
          <Image
            src="/brand/expojuy-logo.svg"
            alt="ExpoJuy 2026 — Feria multisectorial del NOA"
            width={376}
            height={243}
            unoptimized
            className="h-16 w-auto brightness-0 invert"
          />
          <p className="max-w-xs text-neutral-200 text-sm">{t("about")}</p>
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.platform}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={a11y(social.labelKey)}
                className="text-neutral-200 transition-colors hover:text-primary"
              >
                <SocialIcon platform={social.platform} className="size-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 text-center">
          <span className="font-semibold text-neutral-50/60 text-xs uppercase tracking-widest">
            {t("organizer")}
          </span>
          <Image
            src="/brand/camara-comercio-exterior-jujuy.png"
            alt={t("organizerName")}
            width={1077}
            height={1008}
            unoptimized
            className="h-24 w-auto opacity-80 brightness-0 invert"
          />
        </div>

        <nav className="flex flex-col items-center gap-3 text-center">
          <h2 className="font-semibold text-neutral-50 text-sm">{t("sections")}</h2>
          <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-center">
            {footerNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-neutral-200 text-sm transition-colors hover:text-neutral-50"
                >
                  {nav(link.labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="font-semibold text-neutral-50 text-sm">{t("contactTitle")}</h2>
          <ul className="flex flex-col items-center space-y-2 text-neutral-200 text-sm">
            <li>
              <a
                href={`mailto:${siteContact.email}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-neutral-50"
              >
                <Mail className="size-4 shrink-0" aria-hidden />
                {siteContact.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${siteContact.phoneHref}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-neutral-50"
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
                className="inline-flex items-center gap-2 transition-colors hover:text-neutral-50"
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

      <div className="border-neutral-50/15 border-t">
        <div className="mx-auto flex max-w-8xl flex-col gap-2 px-4 py-6 md:flex-row md:items-center md:justify-between md:px-8">
          <p className="text-neutral-200 text-xs">{t("copyright", { year })}</p>
          <p className="text-neutral-200 text-xs">{t("credit")}</p>
        </div>
      </div>
    </footer>
  );
}
