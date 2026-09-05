import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { createFaqRepository, FaqAccordion, GetFaqByCategoryUseCase } from "@/modules/faq";
import { PagePlaceholder } from "@/shared/components";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.faq");
  const title = t("title");
  const description = t("description");
  return { title, description, openGraph: { title, description } };
}

export default async function FaqPage() {
  const page = await getTranslations("pages.faq");
  const list = await getTranslations("faq");
  const common = await getTranslations("common");

  const repository = createFaqRepository();
  const useCase = new GetFaqByCategoryUseCase(repository);
  const groups = await useCase.execute();

  return (
    <PagePlaceholder title={page("title")} description={page("description")}>
      <div className="space-y-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl text-foreground">{list("listTitle")}</h2>
          <p className="mt-2 text-muted-foreground">{list("listDescription")}</p>
        </div>
        <FaqAccordion groups={groups} />
        <p className="text-xs text-muted-foreground">{common("mockNotice")}</p>
      </div>
    </PagePlaceholder>
  );
}
