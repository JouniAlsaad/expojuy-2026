import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import type { EventInfoDto } from "@/modules/about";
import { cn } from "@/shared/lib/utils";
import { buttonVariants } from "@/shared/ui/button";

interface HeroSectionProps {
  event: EventInfoDto;
}

export async function HeroSection({ event }: HeroSectionProps) {
  const t = await getTranslations("home");

  return (
    <section className="relative isolate flex min-h-svh flex-col justify-center overflow-hidden border-border border-b">
      <Image
        src="/images/hero-IA2.jpeg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-neutral-950/85 via-neutral-950/65 to-neutral-950/45"
      />

      <div className="relative mx-auto max-w-6xl px-4 py-20 md:px-8">
        <div className="flex max-w-4xl flex-col gap-6">
          <span className="font-semibold text-primary text-sm uppercase tracking-widest">
            {t("hero.eyebrow")}
          </span>
          <h1 className="font-bold text-4xl text-neutral-50 leading-tight tracking-tight sm:text-5xl">
            {t.rich("hero.title", { br: () => <br /> })}
          </h1>
          <p className="max-w-xl text-lg text-neutral-200">{t("hero.subtitle")}</p>
          <p className="inline-flex items-center gap-2 text-neutral-200 text-sm">
            <MapPin className="size-4 shrink-0 text-primary" aria-hidden />
            {event.datesLabel} · {event.venue}, {event.city}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/entradas"
              className={cn(buttonVariants({ variant: "primary", size: "lg" }), "w-full sm:w-auto")}
            >
              {t("hero.ctaPrimary")}
              <ArrowRight className="size-5" aria-hidden />
            </Link>
            <Link
              href="/agenda"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "w-full border-neutral-50/30 bg-neutral-50/20 text-neutral-50 hover:bg-neutral-50/20 sm:w-auto md:bg-neutral-50/10 md:backdrop-blur",
              )}
            >
              {t("hero.ctaSecondary")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
