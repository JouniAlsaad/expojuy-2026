import { z } from "zod";
import { FAQ_CATEGORIES } from "@/modules/faq/domain";

export const faqRecordSchema = z.object({
  id: z.string().min(1),
  category: z.enum(FAQ_CATEGORIES),
  question: z.string().min(1),
  answer: z.string().min(1),
});

export type FaqRecord = z.infer<typeof faqRecordSchema>;

export const faqDatasetSchema = z.object({
  _mock: z.literal(true),
  _disclaimer: z.string(),
  items: z.array(faqRecordSchema),
});
