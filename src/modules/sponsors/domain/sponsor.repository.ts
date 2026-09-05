import type { Sponsor } from "./sponsor.entity";
import type { SponsorTierSlug } from "./sponsor-tier.vo";

export interface SponsorRepository {
  findAll(): Promise<Sponsor[]>;
  findByTier(tier: SponsorTierSlug): Promise<Sponsor[]>;
}
