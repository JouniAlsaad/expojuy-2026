import type { SponsorId } from "./sponsor-id.vo";
import type { SponsorTier } from "./sponsor-tier.vo";

export interface SponsorProps {
  id: SponsorId;
  name: string;
  tier: SponsorTier;
  website: string | null;
  logoUrl: string | null;
}

export class Sponsor {
  private constructor(private readonly props: SponsorProps) {}

  static create(props: SponsorProps): Sponsor {
    return new Sponsor(props);
  }

  get id(): SponsorId {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get tier(): SponsorTier {
    return this.props.tier;
  }

  get website(): string | null {
    return this.props.website;
  }

  get logoUrl(): string | null {
    return this.props.logoUrl;
  }
}
