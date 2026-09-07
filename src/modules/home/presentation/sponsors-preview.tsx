import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { SponsorCard, type SponsorDto } from "@/modules/sponsors";
import { Reveal } from "@/shared/components";
import { cn } from "@/shared/lib/utils";
import { buttonVariants } from "@/shared/ui/button";

interface SponsorsPreviewProps {
  sponsors: SponsorDto[];
}

export async function SponsorsPreview({ sponsors }: SponsorsPreviewProps) {
  const t = await getTranslations("home");

  if (sponsors.length === 0) {
    return null;
  }

  return (
    <section className="border-border border-t bg-muted/30">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 md:px-8">
        <Reveal className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <span className="font-semibold text-brand-text text-sm uppercase tracking-wide">
              {t("sponsorsPreview.eyebrow")}
            </span>
            <h2 className="mt-3 text-3xl text-foreground md:text-4xl">
              {t("sponsorsPreview.title")}
            </h2>
          </div>
          <Link
            href="/sponsors"
            className={cn(buttonVariants({ variant: "ghost", size: "md" }), "self-start")}
          >
            {t("sponsorsPreview.cta")}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Reveal>
        <div className="flex flex-wrap justify-center gap-5">
          {sponsors.map((sponsor) => (
            <SponsorCard
              key={sponsor.id}
              sponsor={sponsor}
              size="md"
              className="w-full p-8 sm:w-64"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
