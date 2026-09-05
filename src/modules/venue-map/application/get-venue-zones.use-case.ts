import type { VenueRepository } from "@/modules/venue-map/domain";
import type { VenueZoneDto } from "./venue.dto";
import { toVenueZoneDto } from "./venue.mapper";

export class GetVenueZonesUseCase {
  constructor(private readonly repository: VenueRepository) {}

  async execute(): Promise<VenueZoneDto[]> {
    const zones = await this.repository.findAll();
    return zones.map(toVenueZoneDto);
  }
}
