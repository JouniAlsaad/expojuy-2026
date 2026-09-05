import { createEventRepository, GetEventInfoUseCase } from "@/modules/about";
import {
  AboutSection,
  HeroSection,
  PhasesSection,
  RouteAiBand,
  SponsorsPreview,
  ValuesSection,
} from "@/modules/home";
import { createSponsorRepository, GetSponsorsByTierUseCase } from "@/modules/sponsors";

export default async function HomePage() {
  const event = await new GetEventInfoUseCase(createEventRepository()).execute();
  const sponsorGroups = await new GetSponsorsByTierUseCase(createSponsorRepository()).execute();
  const previewSponsors = sponsorGroups
    .filter((group) => group.tier === "diamond" || group.tier === "platinum")
    .flatMap((group) => group.sponsors);

  return (
    <div className="flex flex-col">
      <HeroSection event={event} />
      <AboutSection event={event} />
      <PhasesSection />
      <RouteAiBand />
      <ValuesSection />
      <SponsorsPreview sponsors={previewSponsors} />
    </div>
  );
}
