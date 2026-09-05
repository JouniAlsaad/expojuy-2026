import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { createTicketRepository, GetTicketTypesUseCase, TicketsFlow } from "@/modules/tickets";
import { PagePlaceholder } from "@/shared/components";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.tickets");
  const title = t("title");
  const description = t("description");
  return { title, description, openGraph: { title, description } };
}

export default async function TicketsPage() {
  const page = await getTranslations("pages.tickets");
  const list = await getTranslations("tickets");
  const common = await getTranslations("common");

  const repository = createTicketRepository();
  const useCase = new GetTicketTypesUseCase(repository);
  const tickets = await useCase.execute();

  return (
    <PagePlaceholder title={page("title")} description={page("description")}>
      <div className="space-y-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl text-foreground">{list("listTitle")}</h2>
          <p className="mt-2 text-muted-foreground">{list("listDescription")}</p>
        </div>
        <TicketsFlow tickets={tickets} />
        <p className="text-xs text-muted-foreground">{common("mockNotice")}</p>
      </div>
    </PagePlaceholder>
  );
}
