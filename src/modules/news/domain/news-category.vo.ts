export const NEWS_CATEGORIES = [
  "institucional",
  "tecnologia",
  "negocios",
  "gastronomia",
  "turismo",
  "mineria-energia",
] as const;

export type NewsCategorySlug = (typeof NEWS_CATEGORIES)[number];

function isCategorySlug(value: string): value is NewsCategorySlug {
  return (NEWS_CATEGORIES as readonly string[]).includes(value);
}

export class NewsCategory {
  private constructor(private readonly slug: NewsCategorySlug) {}

  static create(value: string): NewsCategory {
    if (!isCategorySlug(value)) {
      throw new Error(`Unknown news category: ${value}`);
    }
    return new NewsCategory(value);
  }

  get value(): NewsCategorySlug {
    return this.slug;
  }
}
