import { z } from "zod";
import { SPONSOR_TIERS } from "@/modules/sponsors/domain";

export const sponsorRecordSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  tier: z.enum(SPONSOR_TIERS),
  website: z.string().url().nullable(),
  logoUrl: z.string().nullable(),
});

export type SponsorRecord = z.infer<typeof sponsorRecordSchema>;

export const sponsorDatasetSchema = z.object({
  _mock: z.literal(true),
  _disclaimer: z.string(),
  items: z.array(sponsorRecordSchema),
});
