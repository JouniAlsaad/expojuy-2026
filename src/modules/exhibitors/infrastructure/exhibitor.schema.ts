import { z } from "zod";
import { EXHIBITOR_CATEGORIES } from "@/modules/exhibitors/domain";

export const exhibitorRecordSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  slug: z.string().min(1),
  category: z.enum(EXHIBITOR_CATEGORIES),
  summary: z.string().min(1),
  pavilion: z.string().min(1),
  booth: z.string().min(1),
  website: z.string().url().nullable(),
  logoUrl: z.string().nullable(),
  featured: z.boolean(),
});

export type ExhibitorRecord = z.infer<typeof exhibitorRecordSchema>;

export const exhibitorDatasetSchema = z.object({
  _mock: z.literal(true),
  _disclaimer: z.string(),
  items: z.array(exhibitorRecordSchema),
});
