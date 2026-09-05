import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { createSessionRepository, GetAgendaByDayUseCase } from "@/modules/agenda";
import { createExhibitorRepository, GetExhibitorsUseCase } from "@/modules/exhibitors";
import { ItineraryPlanner } from "@/modules/itinerary";
import { PagePlaceholder } from "@/shared/components";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.itinerary");
  const title = t("title");
  const description = t("description");
  return { title, description, openGraph: { title, description } };
}

export default async function ItineraryPage() {
  const page = await getTranslations("pages.itinerary");
  const list = await getTranslations("itinerary");
  const common = await getTranslations("common");

  const agenda = await new GetAgendaByDayUseCase(createSessionRepository()).execute();
  const exhibitors = await new GetExhibitorsUseCase(createExhibitorRepository()).execute();

  const sessions = agenda.flatMap((day) => day.sessions);
  const days = agenda.map((day) => ({ day: day.day, dayLabel: day.dayLabel }));

  return (
    <PagePlaceholder title={page("title")} description={page("description")}>
      <div className="space-y-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl text-foreground">{list("listTitle")}</h2>
          <p className="mt-2 text-muted-foreground">{list("listDescription")}</p>
        </div>
        <ItineraryPlanner sessions={sessions} exhibitors={exhibitors} days={days} />
        <p className="text-xs text-muted-foreground">{common("mockNotice")}</p>
      </div>
    </PagePlaceholder>
  );
}
