import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import {
  createVenueRepository,
  GetVenueZonesUseCase,
  VenueLocation,
  VenueMap,
} from "@/modules/venue-map";
import { PagePlaceholder } from "@/shared/components";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.map");
  const title = t("title");
  const description = t("description");
  return { title, description, openGraph: { title, description } };
}

export default async function MapPage() {
  const page = await getTranslations("pages.map");
  const list = await getTranslations("venue");
  const common = await getTranslations("common");

  const repository = createVenueRepository();
  const useCase = new GetVenueZonesUseCase(repository);
  const zones = await useCase.execute();

  return (
    <PagePlaceholder title={page("title")} description={page("description")}>
      <div className="space-y-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl text-foreground">{list("listTitle")}</h2>
          <p className="mt-2 text-muted-foreground">{list("listDescription")}</p>
        </div>
        <VenueMap zones={zones} />
        <p className="text-xs text-muted-foreground">{common("mockNotice")}</p>
        <VenueLocation />
      </div>
    </PagePlaceholder>
  );
}
