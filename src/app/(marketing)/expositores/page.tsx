import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import {
  createExhibitorRepository,
  ExhibitorExplorer,
  GetExhibitorsUseCase,
} from "@/modules/exhibitors";
import { PagePlaceholder } from "@/shared/components";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.exhibitors");
  const title = t("title");
  const description = t("description");
  return { title, description, openGraph: { title, description } };
}

export default async function ExhibitorsPage() {
  const page = await getTranslations("pages.exhibitors");
  const list = await getTranslations("exhibitors");
  const common = await getTranslations("common");

  const repository = createExhibitorRepository();
  const useCase = new GetExhibitorsUseCase(repository);
  const exhibitors = await useCase.execute();

  return (
    <PagePlaceholder title={page("title")} description={page("description")}>
      <div className="space-y-6">
        <div className="max-w-2xl">
          <h2 className="text-2xl text-foreground">{list("listTitle")}</h2>
          <p className="mt-2 text-muted-foreground">{list("listDescription")}</p>
        </div>
        <ExhibitorExplorer exhibitors={exhibitors} />
        <p className="text-xs text-muted-foreground">{common("mockNotice")}</p>
      </div>
    </PagePlaceholder>
  );
}
