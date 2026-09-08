import venueData from "@/data/venue.json";
import type { VenueRepository } from "@/modules/venue-map/domain";
import { VenueZone, ZoneKind } from "@/modules/venue-map/domain";
import { type VenueZoneRecord, venueDatasetSchema } from "./venue.schema";

function toEntity(record: VenueZoneRecord): VenueZone {
  return VenueZone.create({
    id: record.id,
    name: record.name,
    kind: ZoneKind.create(record.kind),
    category: record.category,
    description: record.description,
    geometry: { x: record.x, y: record.y, width: record.width, height: record.height },
    highlights: record.highlights,
  });
}

export class JsonVenueRepository implements VenueRepository {
  private readonly zones: VenueZone[];

  constructor() {
    const dataset = venueDatasetSchema.parse(venueData);
    this.zones = dataset.zones.map(toEntity);
  }

  async findAll(): Promise<VenueZone[]> {
    return this.zones;
  }
}

export function createVenueRepository(): VenueRepository {
  return new JsonVenueRepository();
}
