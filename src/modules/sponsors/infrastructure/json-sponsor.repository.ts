import sponsorsData from "@/data/sponsors.json";
import type { SponsorRepository, SponsorTierSlug } from "@/modules/sponsors/domain";
import { Sponsor, SponsorId, SponsorTier } from "@/modules/sponsors/domain";
import { type SponsorRecord, sponsorDatasetSchema } from "./sponsor.schema";

function toEntity(record: SponsorRecord): Sponsor {
  return Sponsor.create({
    id: SponsorId.create(record.id),
    name: record.name,
    tier: SponsorTier.create(record.tier),
    website: record.website,
    logoUrl: record.logoUrl,
  });
}

export class JsonSponsorRepository implements SponsorRepository {
  private readonly sponsors: Sponsor[];

  constructor() {
    const dataset = sponsorDatasetSchema.parse(sponsorsData);
    this.sponsors = dataset.items.map(toEntity);
  }

  async findAll(): Promise<Sponsor[]> {
    return this.sponsors;
  }

  async findByTier(tier: SponsorTierSlug): Promise<Sponsor[]> {
    return this.sponsors.filter((sponsor) => sponsor.tier.value === tier);
  }
}

export function createSponsorRepository(): SponsorRepository {
  return new JsonSponsorRepository();
}
