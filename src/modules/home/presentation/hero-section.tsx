import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import type { EventInfoDto } from "@/modules/about";
import { Countdown } from "@/shared/components";
import { cn } from "@/shared/lib/utils";
import { buttonVariants } from "@/shared/ui/button";

interface HeroSectionProps {
  event: EventInfoDto;
}

const heroTiles = [
  { x: 24, y: 24, size: 84, className: "fill-accent-soft" },
  { x: 124, y: 24, size: 84, className: "fill-primary" },
  { x: 232, y: 44, size: 60, className: "fill-accent/80" },
  { x: 44, y: 124, size: 84, className: "fill-secondary" },
  { x: 144, y: 124, size: 84, className: "fill-accent-soft/80" },
  { x: 248, y: 128, size: 60, className: "fill-primary/70" },
  { x: 24, y: 224, size: 60, className: "fill-accent" },
  { x: 112, y: 216, size: 92, className: "fill-secondary/80" },
  { x: 224, y: 224, size: 84, className: "fill-accent-soft" },
] as const;

function HeroArt() {
  return (
    <svg viewBox="0 0 320 320" className="h-auto w-full max-w-md" aria-hidden>
      {heroTiles.map((tile) => (
        <rect
          key={`${tile.x}-${tile.y}`}
          x={tile.x}
          y={tile.y}
          width={tile.size}
          height={tile.size}
          rx={18}
          className={tile.className}
        />
      ))}
    </svg>
  );
}

export async function HeroSection({ event }: HeroSectionProps) {
  const t = await getTranslations("home");

  return (
    <section className="border-border border-b bg-gradient-to-b from-muted/60 to-background">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 md:px-8 md:py-28 lg:grid-cols-2 lg:items-center">
        <div className="flex flex-col gap-6">
          <span className="font-medium text-brand-text text-sm uppercase tracking-wide">
            {t("hero.eyebrow")}
          </span>
          <h1 className="max-w-3xl text-4xl text-foreground leading-tight md:text-6xl">
            {t("hero.title")}
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground">{t("hero.subtitle")}</p>
          <p className="inline-flex items-center gap-2 text-muted-foreground text-sm">
            <MapPin className="size-4 shrink-0 text-brand-text" aria-hidden />
            {event.datesLabel} · {event.venue}, {event.city}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/entradas"
              className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
            >
              {t("hero.ctaPrimary")}
              <ArrowRight className="size-5" aria-hidden />
            </Link>
            <Link href="/agenda" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
              {t("hero.ctaSecondary")}
            </Link>
          </div>
          <Countdown targetIso={event.startDate} />
        </div>
        <div className="hidden justify-center lg:flex">
          <HeroArt />
        </div>
      </div>
    </section>
  );
}
