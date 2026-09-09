import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { createSponsorRepository, GetSponsorsByTierUseCase, SponsorCard } from "@/modules/sponsors";
import { Reveal } from "@/shared/components";
import { cn } from "@/shared/lib/utils";
import { buttonVariants } from "@/shared/ui/button";

interface Partner {
  name: string;
  logoUrl: string;
  website: string;
}

const partners: readonly Partner[] = [
  {
    name: "Jujuy Con la Gente",
    logoUrl: "/images/sponsors/jujuyConLaGente.webp",
    website: "https://jujuy.gob.ar/",
  },
  {
    name: "Municipalidad de San Salvador de Jujuy",
    logoUrl: "/images/sponsors/MunicipalidadDeSanSalvador.webp",
    website: "https://www.sansalvadordejujuy.gob.ar/",
  },
  {
    name: "Consejo Federal de Inversiones",
    logoUrl: "/images/sponsors/CFI.svg",
    website: "https://cfi.org.ar/",
  },
  {
    name: "Cámara Argentina de Comercio y Servicios",
    logoUrl: "/images/sponsors/CamaraArgentinaDeComercioYservicios.webp",
    website: "https://www.cac.com.ar/",
  },
  {
    name: "Secretaría de Turismo, Ambiente y Deportes",
    logoUrl: "/images/sponsors/secretariaDeTurismoAmbienteYdeporte.webp",
    website: "https://www.argentina.gob.ar/jefatura/turismo-ambiente-y-deportes",
  },
];

const cardClass =
  "flex items-center justify-center rounded-xl border border-border bg-surface-logo p-6 shadow-soft transition-shadow hover:shadow-violet lg:col-span-2";

const PREVIEW_SPONSORS_COUNT = 3;

export async function SponsorsPreview() {
  const t = await getTranslations("home");

  const useCase = new GetSponsorsByTierUseCase(createSponsorRepository());
  const groups = await useCase.execute();
  const sponsors = groups.flatMap((group) => group.sponsors).slice(0, PREVIEW_SPONSORS_COUNT);

  return (
    <section className="border-border border-t bg-muted/30">
      <div className="mx-auto w-full max-w-6xl px-4 py-20 md:px-8">
        <Reveal className="mb-10 max-w-xl">
          <span className="font-semibold text-brand-text text-sm uppercase tracking-wide">
            {t("sponsorsPreview.eyebrow")}
          </span>
          <h2 className="mt-3 text-3xl text-foreground md:text-4xl">
            {t("sponsorsPreview.title")}
          </h2>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-6">
          {partners.map((partner, index) => (
            <Reveal
              key={partner.logoUrl}
              className={cn(cardClass, index === 3 && "lg:col-start-2")}
            >
              <a
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${partner.name} (abre en una pestaña nueva)`}
                className="flex h-full w-full items-center justify-center"
              >
                <Image
                  src={partner.logoUrl}
                  alt={partner.name}
                  width={280}
                  height={112}
                  unoptimized
                  className="h-24 w-auto max-w-full object-contain sm:h-28 lg:h-32"
                />
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20 mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <span className="font-semibold text-brand-text text-sm uppercase tracking-wide">
              {t("sponsorsPreview.sponsors.eyebrow")}
            </span>
            <h2 className="mt-3 text-3xl text-foreground md:text-4xl">
              {t("sponsorsPreview.sponsors.title")}
            </h2>
          </div>
          <Link
            href="/sponsors"
            className={cn(buttonVariants({ variant: "ghost", size: "md" }), "self-start")}
          >
            {t("sponsorsPreview.sponsors.cta")}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sponsors.map((sponsor) => (
            <Reveal key={sponsor.id}>
              <SponsorCard sponsor={sponsor} size="lg" className="h-full" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
