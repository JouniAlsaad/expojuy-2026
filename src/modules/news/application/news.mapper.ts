import type { NewsArticle } from "@/modules/news/domain";
import type { NewsArticleDto } from "./news.dto";

const dateFormatter = new Intl.DateTimeFormat("es-AR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function toNewsArticleDto(article: NewsArticle): NewsArticleDto {
  return {
    id: article.id,
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt,
    publishedAt: article.publishedAt,
    publishedLabel: dateFormatter.format(new Date(`${article.publishedAt}T00:00:00`)),
    category: article.category.value,
    coverUrl: article.coverUrl,
  };
}
