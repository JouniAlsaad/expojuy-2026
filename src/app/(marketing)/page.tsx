import { createEventRepository, GetEventInfoUseCase } from "@/modules/about";
import {
  AboutSection,
  ActivitiesSection,
  ClosingImageSection,
  CountdownSection,
  GallerySection,
  HeroSection,
  PhasesSection,
  RouteAiBand,
  SponsorsPreview,
  ValuesSection,
} from "@/modules/home";

export default async function HomePage() {
  const event = await new GetEventInfoUseCase(createEventRepository()).execute();

  return (
    <div className="flex flex-col">
      <HeroSection event={event} />
      <AboutSection event={event} />
      <CountdownSection event={event} />
      <PhasesSection />
      <RouteAiBand />
      <ValuesSection />
      <GallerySection />
      <ActivitiesSection />
      <SponsorsPreview />
      <ClosingImageSection />
    </div>
  );
}
