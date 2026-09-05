import { getTranslations } from "next-intl/server";
import type { SponsorTierGroupDto } from "@/modules/sponsors/application";
import { Reveal } from "@/shared/components";
import { SponsorCard } from "./sponsor-card";

interface SponsorsBoardProps {
  groups: SponsorTierGroupDto[];
}

export async function SponsorsBoard({ groups }: SponsorsBoardProps) {
  const t = await getTranslations("sponsors");

  if (groups.length === 0) {
    return <p className="text-muted-foreground">{t("empty")}</p>;
  }

  return (
    <div className="space-y-12">
      {groups.map((group) => (
        <Reveal key={group.tier} className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="h-px flex-1 bg-border" aria-hidden />
            <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-brand-text">
              {t(`tiers.${group.tier}`)}
            </h2>
            <span className="h-px flex-1 bg-border" aria-hidden />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {group.sponsors.map((sponsor) => (
              <SponsorCard key={sponsor.id} sponsor={sponsor} />
            ))}
          </div>
        </Reveal>
      ))}
    </div>
  );
}
