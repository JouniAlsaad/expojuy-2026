import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/modules/contact";
import { PagePlaceholder } from "@/shared/components";
import { siteContact } from "@/shared/config";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.contact");
  const title = t("title");
  const description = t("description");
  return { title, description, openGraph: { title, description } };
}

export default async function ContactPage() {
  const page = await getTranslations("pages.contact");
  const contact = await getTranslations("contact");
  const footer = await getTranslations("footer");

  return (
    <PagePlaceholder title={page("title")} description={page("description")}>
      <div className="grid gap-12 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="max-w-xl">
            <h2 className="text-2xl text-foreground">{contact("formTitle")}</h2>
            <p className="mt-2 text-muted-foreground">{contact("formDescription")}</p>
          </div>
          <ContactForm />
        </div>

        <aside className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">{contact("channelsTitle")}</h2>
          <ul className="space-y-3 text-sm text-muted-foreground">
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
              <span>{footer("address")}</span>
            </li>
          </ul>
        </aside>
      </div>
    </PagePlaceholder>
  );
}
