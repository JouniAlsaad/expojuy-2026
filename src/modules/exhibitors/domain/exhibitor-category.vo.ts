export const EXHIBITOR_CATEGORIES = [
  "mineria-energia",
  "agroindustria",
  "turismo",
  "tecnologia",
  "artesanias",
  "gastronomia",
  "servicios",
] as const;

export type ExhibitorCategorySlug = (typeof EXHIBITOR_CATEGORIES)[number];

function isCategorySlug(value: string): value is ExhibitorCategorySlug {
  return (EXHIBITOR_CATEGORIES as readonly string[]).includes(value);
}

export class ExhibitorCategory {
  private constructor(private readonly slug: ExhibitorCategorySlug) {}

  static create(value: string): ExhibitorCategory {
    if (!isCategorySlug(value)) {
      throw new Error(`Unknown exhibitor category: ${value}`);
    }
    return new ExhibitorCategory(value);
  }

  get value(): ExhibitorCategorySlug {
    return this.slug;
  }

  equals(other: ExhibitorCategory): boolean {
    return this.slug === other.slug;
  }
}
