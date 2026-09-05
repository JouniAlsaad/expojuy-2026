import { getTranslations } from "next-intl/server";
import type { NewsArticleDto } from "@/modules/news/application";
import { NewsCard } from "./news-card";

interface NewsGridProps {
  articles: NewsArticleDto[];
}

export async function NewsGrid({ articles }: NewsGridProps) {
  const t = await getTranslations("news");

  if (articles.length === 0) {
    return <p className="text-muted-foreground">{t("empty")}</p>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {articles.map((article) => (
        <NewsCard key={article.id} article={article} />
      ))}
    </div>
  );
}
