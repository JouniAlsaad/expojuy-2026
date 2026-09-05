import { z } from "zod";

export const eventStatsSchema = z.object({
  stands: z.number().int().nonnegative(),
  surfaceM2: z.number().int().nonnegative(),
  visitors: z.number().int().nonnegative(),
  editions: z.number().int().nonnegative(),
});

export const eventInfoSchema = z.object({
  _mock: z.literal(true),
  _disclaimer: z.string(),
  edition: z.number().int().positive(),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  venue: z.string().min(1),
  city: z.string().min(1),
  stats: eventStatsSchema,
});

export type EventInfoRecord = z.infer<typeof eventInfoSchema>;
