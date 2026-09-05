import type { NewsRepository } from "@/modules/news/domain";
import type { NewsArticleDto } from "./news.dto";
import { toNewsArticleDto } from "./news.mapper";

export class GetArticleBySlugUseCase {
  constructor(private readonly repository: NewsRepository) {}

  async execute(slug: string): Promise<NewsArticleDto | null> {
    const article = await this.repository.findBySlug(slug);
    return article ? toNewsArticleDto(article) : null;
  }
}
