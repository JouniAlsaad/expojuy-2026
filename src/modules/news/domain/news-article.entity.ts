import type { NewsCategory } from "./news-category.vo";

export interface NewsArticleProps {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  category: NewsCategory;
  coverUrl: string | null;
}

export class NewsArticle {
  private constructor(private readonly props: NewsArticleProps) {}

  static create(props: NewsArticleProps): NewsArticle {
    return new NewsArticle(props);
  }

  get id(): string {
    return this.props.id;
  }

  get title(): string {
    return this.props.title;
  }

  get slug(): string {
    return this.props.slug;
  }

  get excerpt(): string {
    return this.props.excerpt;
  }

  get publishedAt(): string {
    return this.props.publishedAt;
  }

  get category(): NewsCategory {
    return this.props.category;
  }

  get coverUrl(): string | null {
    return this.props.coverUrl;
  }
}
