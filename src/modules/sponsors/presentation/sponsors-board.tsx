import { getTranslations } from "next-intl/server";
import type { SponsorDto } from "@/modules/sponsors/application";
import { Reveal } from "@/shared/components";
import { SponsorCard } from "./sponsor-card";

interface SponsorsBoardProps {
  sponsors: SponsorDto[];
}

export async function SponsorsBoard({ sponsors }: SponsorsBoardProps) {
  const t = await getTranslations("sponsors");

  if (sponsors.length === 0) {
    return <p className="text-muted-foreground">{t("empty")}</p>;
  }

  return (
    <Reveal>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sponsors.map((sponsor) => (
          <SponsorCard key={sponsor.id} sponsor={sponsor} size="md" className="min-h-40 p-8" />
        ))}
      </div>
    </Reveal>
  );
}
