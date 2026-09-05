import { z } from "zod";

export const ticketRecordSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  name: z.string().min(1),
  price: z.number().min(0),
  highlighted: z.boolean(),
  perks: z.array(z.string().min(1)),
});

export type TicketRecord = z.infer<typeof ticketRecordSchema>;

export const ticketDatasetSchema = z.object({
  _mock: z.literal(true),
  _disclaimer: z.string(),
  items: z.array(ticketRecordSchema),
});
