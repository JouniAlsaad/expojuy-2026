import type { Sponsor } from "@/modules/sponsors/domain";
import type { SponsorDto } from "./sponsor.dto";

export function toSponsorDto(sponsor: Sponsor): SponsorDto {
  return {
    id: sponsor.id.toString(),
    name: sponsor.name,
    tier: sponsor.tier.value,
    website: sponsor.website,
    logoUrl: sponsor.logoUrl,
  };
}
