import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AgendaTimeline, createSessionRepository, GetAgendaByDayUseCase } from "@/modules/agenda";
import { PagePlaceholder } from "@/shared/components";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.agenda");
  const title = t("title");
  const description = t("description");
  return { title, description, openGraph: { title, description } };
}

export default async function AgendaPage() {
  const page = await getTranslations("pages.agenda");
  const list = await getTranslations("agenda");
  const common = await getTranslations("common");

  const repository = createSessionRepository();
  const useCase = new GetAgendaByDayUseCase(repository);
  const days = await useCase.execute();

  return (
    <PagePlaceholder title={page("title")} description={page("description")}>
      <div className="space-y-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl text-foreground">{list("listTitle")}</h2>
          <p className="mt-2 text-muted-foreground">{list("listDescription")}</p>
        </div>
        <AgendaTimeline days={days} />
        <p className="text-xs text-muted-foreground">{common("mockNotice")}</p>
      </div>
    </PagePlaceholder>
  );
}
