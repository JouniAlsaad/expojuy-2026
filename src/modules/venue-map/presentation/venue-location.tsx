import { MapPin } from "lucide-react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { cn } from "@/shared/lib/utils";
import { buttonVariants } from "@/shared/ui/button";

const VENUE_QUERY = "-24.182735,-65.329722";
const MAPS_EMBED_SRC = `https://maps.google.com/maps?q=${VENUE_QUERY}&z=16&hl=es&output=embed`;
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${VENUE_QUERY}`;

export async function VenueLocation() {
  const t = await getTranslations("venue");

  return (
    <section className="relative isolate overflow-hidden rounded-2xl border border-neutral-50/15">
      <Image
        src="/images/imgRecursos/fondoContador.jpeg"
        alt=""
        fill
        sizes="(min-width: 1024px) 72rem, 100vw"
        className="-z-10 object-cover object-center"
      />
      <div
        aria-hidden
        className="-z-10 absolute inset-0 bg-gradient-to-br from-neutral-950/85 via-neutral-950/70 to-neutral-950/55"
      />
      <div className="grid gap-8 p-8 md:p-10 lg:grid-cols-2 lg:items-center">
        <div className="space-y-4">
          <p className="font-medium text-primary text-sm">{t("locationEyebrow")}</p>
          <h2 className="font-display text-3xl text-neutral-50 md:text-4xl">
            {t("locationTitle")}
          </h2>
          <p className="max-w-md text-neutral-200">{t("locationDescription")}</p>
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
