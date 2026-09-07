import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { createSessionRepository, GetAgendaByDayUseCase } from "@/modules/agenda";
import { createExhibitorRepository, GetExhibitorsUseCase } from "@/modules/exhibitors";
import { GenerateMeetingSlotsUseCase, MatchmakingFlow } from "@/modules/matchmaking";
import { PagePlaceholder } from "@/shared/components";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.matchmaking");
  const title = t("title");
  const description = t("description");
  return { title, description, openGraph: { title, description } };
}

export default async function MatchmakingPage() {
  const page = await getTranslations("pages.matchmaking");
  const list = await getTranslations("matchmaking");
  const common = await getTranslations("common");

  const exhibitors = await new GetExhibitorsUseCase(createExhibitorRepository()).execute();
  const agenda = await new GetAgendaByDayUseCase(createSessionRepository()).execute();
  const days = agenda.map((day) => ({ day: day.day, dayLabel: day.dayLabel }));
  const slots = new GenerateMeetingSlotsUseCase().execute(days);

  return (
    <PagePlaceholder title={page("title")} description={page("description")}>
      <div className="space-y-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl text-foreground">{list("listTitle")}</h2>
          <p className="mt-2 text-muted-foreground">{list("listDescription")}</p>
        </div>
        <MatchmakingFlow exhibitors={exhibitors} slots={slots} />
        <p className="text-xs text-muted-foreground">{common("mockNotice")}</p>
      </div>
    </PagePlaceholder>
  );
}
