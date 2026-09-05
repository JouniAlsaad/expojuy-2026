import type { VenueZone } from "./venue-zone.entity";

export interface VenueRepository {
  findAll(): Promise<VenueZone[]>;
}
