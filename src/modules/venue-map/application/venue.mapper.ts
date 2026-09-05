import type { VenueZone } from "@/modules/venue-map/domain";
import type { VenueZoneDto } from "./venue.dto";

export function toVenueZoneDto(zone: VenueZone): VenueZoneDto {
  const geometry = zone.geometry;
  return {
    id: zone.id,
    name: zone.name,
    kind: zone.kind.value,
    category: zone.category,
    description: zone.description,
    x: geometry.x,
    y: geometry.y,
    width: geometry.width,
    height: geometry.height,
  };
}
