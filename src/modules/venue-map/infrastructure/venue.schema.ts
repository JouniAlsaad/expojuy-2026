import { z } from "zod";
import { ZONE_KINDS } from "@/modules/venue-map/domain";

export const venueZoneRecordSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  kind: z.enum(ZONE_KINDS),
  category: z.string().nullable(),
  description: z.string().min(1),
  x: z.number(),
  y: z.number(),
  width: z.number().positive(),
  height: z.number().positive(),
});

export type VenueZoneRecord = z.infer<typeof venueZoneRecordSchema>;

export const venueDatasetSchema = z.object({
  _mock: z.literal(true),
  _disclaimer: z.string(),
  zones: z.array(venueZoneRecordSchema),
});
