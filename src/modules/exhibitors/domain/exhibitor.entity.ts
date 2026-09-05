import type { BoothLocation } from "./booth-location.vo";
import type { ExhibitorCategory } from "./exhibitor-category.vo";
import type { ExhibitorId } from "./exhibitor-id.vo";

export interface ExhibitorProps {
  id: ExhibitorId;
  name: string;
  slug: string;
  category: ExhibitorCategory;
  summary: string;
  booth: BoothLocation;
  website: string | null;
  logoUrl: string | null;
  featured: boolean;
}

export class Exhibitor {
  private constructor(private readonly props: ExhibitorProps) {}

  static create(props: ExhibitorProps): Exhibitor {
    return new Exhibitor(props);
  }

  get id(): ExhibitorId {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get slug(): string {
    return this.props.slug;
  }

  get category(): ExhibitorCategory {
    return this.props.category;
  }

  get summary(): string {
    return this.props.summary;
  }

  get booth(): BoothLocation {
    return this.props.booth;
  }

  get website(): string | null {
    return this.props.website;
  }

  get logoUrl(): string | null {
    return this.props.logoUrl;
  }

  get isFeatured(): boolean {
    return this.props.featured;
  }
}
