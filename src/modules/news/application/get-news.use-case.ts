import type { NewsRepository } from "@/modules/news/domain";
import type { NewsArticleDto } from "./news.dto";
import { toNewsArticleDto } from "./news.mapper";

export class GetNewsUseCase {
  constructor(private readonly repository: NewsRepository) {}

  async execute(): Promise<NewsArticleDto[]> {
    const articles = await this.repository.findAll();
    return articles
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
      .map(toNewsArticleDto);
  }
}
