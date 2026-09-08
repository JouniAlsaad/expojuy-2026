import { MapPin } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { cn } from "@/shared/lib/utils";
import { buttonVariants } from "@/shared/ui/button";

const VENUE_QUERY = "-24.182735,-65.329722";
const MAPS_EMBED_SRC = `https://maps.google.com/maps?q=${VENUE_QUERY}&z=16&hl=es&output=embed`;
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${VENUE_QUERY}`;

export async function VenueLocation() {
  const t = await getTranslations("venue");

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-accent-soft to-card">
      <div className="grid gap-8 p-8 md:p-10 lg:grid-cols-2 lg:items-center">
        <div className="space-y-4">
          <p className="font-medium text-brand-text text-sm">{t("locationEyebrow")}</p>
          <h2 className="font-display text-3xl text-foreground md:text-4xl">
            {t("locationTitle")}
          </h2>
          <p className="max-w-md text-muted-foreground">{t("locationDescription")}</p>
          <a
            href={MAPS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "primary", size: "lg" }), "gap-2")}
          >
            <MapPin className="size-4 shrink-0" aria-hidden />
            {t("locationCta")}
          </a>
        </div>

        <div className="aspect-square overflow-hidden rounded-xl border border-border shadow-soft lg:aspect-video">
          <iframe
            src={MAPS_EMBED_SRC}
            title={t("locationMapTitle")}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="h-full w-full border-0"
          />
        </div>
      </div>
    </section>
  );
}
