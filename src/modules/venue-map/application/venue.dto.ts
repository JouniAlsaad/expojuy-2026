import type { ZoneKindSlug } from "@/modules/venue-map/domain";

export interface VenueZoneHighlightDto {
  brand: string;
  product: string;
}

export interface VenueZoneDto {
  id: string;
  name: string;
  kind: ZoneKindSlug;
  category: string | null;
  description: string;
  x: number;
  y: number;
  width: number;
  height: number;
  highlights: VenueZoneHighlightDto[];
}
