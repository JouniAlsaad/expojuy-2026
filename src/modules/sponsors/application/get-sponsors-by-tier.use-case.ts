import { SPONSOR_TIERS, type SponsorRepository } from "@/modules/sponsors/domain";
import type { SponsorTierGroupDto } from "./sponsor.dto";
import { toSponsorDto } from "./sponsor.mapper";

export class GetSponsorsByTierUseCase {
  constructor(private readonly repository: SponsorRepository) {}

  async execute(): Promise<SponsorTierGroupDto[]> {
    const sponsors = await this.repository.findAll();
    return SPONSOR_TIERS.map((tier) => ({
      tier,
      sponsors: sponsors.filter((sponsor) => sponsor.tier.value === tier).map(toSponsorDto),
    })).filter((group) => group.sponsors.length > 0);
  }
}
