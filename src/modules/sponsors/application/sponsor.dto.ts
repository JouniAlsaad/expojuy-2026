import type { SponsorTierSlug } from "@/modules/sponsors/domain";

export interface SponsorDto {
  id: string;
  name: string;
  tier: SponsorTierSlug;
  website: string | null;
  logoUrl: string | null;
}

export interface SponsorTierGroupDto {
  tier: SponsorTierSlug;
  sponsors: SponsorDto[];
}
