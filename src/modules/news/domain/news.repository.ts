import type { NewsArticle } from "./news-article.entity";

export interface NewsRepository {
  findAll(): Promise<NewsArticle[]>;
  findBySlug(slug: string): Promise<NewsArticle | null>;
}
