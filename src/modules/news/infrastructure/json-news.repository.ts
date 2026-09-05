import newsData from "@/data/news.json";
import type { NewsRepository } from "@/modules/news/domain";
import { NewsArticle, NewsCategory } from "@/modules/news/domain";
import { type NewsRecord, newsDatasetSchema } from "./news.schema";

function toEntity(record: NewsRecord): NewsArticle {
  return NewsArticle.create({
    id: record.id,
    title: record.title,
    slug: record.slug,
    excerpt: record.excerpt,
    publishedAt: record.publishedAt,
    category: NewsCategory.create(record.category),
    coverUrl: record.coverUrl,
  });
}

export class JsonNewsRepository implements NewsRepository {
  private readonly articles: NewsArticle[];

  constructor() {
    const dataset = newsDatasetSchema.parse(newsData);
    this.articles = dataset.items.map(toEntity);
  }

  async findAll(): Promise<NewsArticle[]> {
    return this.articles;
  }

  async findBySlug(slug: string): Promise<NewsArticle | null> {
    return this.articles.find((article) => article.slug === slug) ?? null;
  }
}

export function createNewsRepository(): NewsRepository {
  return new JsonNewsRepository();
}
