export const SPONSOR_TIERS = ["diamond", "platinum", "gold", "silver", "bronze"] as const;

export type SponsorTierSlug = (typeof SPONSOR_TIERS)[number];

function isTierSlug(value: string): value is SponsorTierSlug {
  return (SPONSOR_TIERS as readonly string[]).includes(value);
}

export class SponsorTier {
  private constructor(private readonly slug: SponsorTierSlug) {}

  static create(value: string): SponsorTier {
    if (!isTierSlug(value)) {
      throw new Error(`Unknown sponsor tier: ${value}`);
    }
    return new SponsorTier(value);
  }

  get value(): SponsorTierSlug {
    return this.slug;
  }

  get rank(): number {
    return SPONSOR_TIERS.indexOf(this.slug);
  }

  equals(other: SponsorTier): boolean {
    return this.slug === other.slug;
  }
}
