export const FAQ_CATEGORIES = ["general", "entradas", "expositores"] as const;

export type FaqCategorySlug = (typeof FAQ_CATEGORIES)[number];

function isCategorySlug(value: string): value is FaqCategorySlug {
  return (FAQ_CATEGORIES as readonly string[]).includes(value);
}

export class FaqCategory {
  private constructor(private readonly slug: FaqCategorySlug) {}

  static create(value: string): FaqCategory {
    if (!isCategorySlug(value)) {
      throw new Error(`Unknown faq category: ${value}`);
    }
    return new FaqCategory(value);
  }

  get value(): FaqCategorySlug {
    return this.slug;
  }
}
