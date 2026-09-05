import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { createNewsRepository, GetNewsUseCase, NewsGrid } from "@/modules/news";
import { PagePlaceholder } from "@/shared/components";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.news");
  const title = t("title");
  const description = t("description");
  return { title, description, openGraph: { title, description } };
}

export default async function NewsPage() {
  const page = await getTranslations("pages.news");
  const list = await getTranslations("news");
  const common = await getTranslations("common");

  const repository = createNewsRepository();
  const useCase = new GetNewsUseCase(repository);
  const articles = await useCase.execute();

  return (
    <PagePlaceholder title={page("title")} description={page("description")}>
      <div className="space-y-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl text-foreground">{list("listTitle")}</h2>
          <p className="mt-2 text-muted-foreground">{list("listDescription")}</p>
        </div>
        <NewsGrid articles={articles} />
        <p className="text-xs text-muted-foreground">{common("mockNotice")}</p>
      </div>
    </PagePlaceholder>
  );
}
