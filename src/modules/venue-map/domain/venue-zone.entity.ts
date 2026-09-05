import type { ZoneKind } from "./zone-kind.vo";

export interface ZoneGeometry {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface VenueZoneProps {
  id: string;
  name: string;
  kind: ZoneKind;
  category: string | null;
  description: string;
  geometry: ZoneGeometry;
}

export class VenueZone {
  private constructor(private readonly props: VenueZoneProps) {}

  static create(props: VenueZoneProps): VenueZone {
    return new VenueZone(props);
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get kind(): ZoneKind {
    return this.props.kind;
  }

  get category(): string | null {
    return this.props.category;
  }

  get description(): string {
    return this.props.description;
  }

  get geometry(): ZoneGeometry {
    return this.props.geometry;
  }
}
