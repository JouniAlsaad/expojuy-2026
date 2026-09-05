import type { NewsCategorySlug } from "@/modules/news/domain";

export interface NewsArticleDto {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  publishedLabel: string;
  category: NewsCategorySlug;
  coverUrl: string | null;
}
