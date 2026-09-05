import { z } from "zod";
import { NEWS_CATEGORIES } from "@/modules/news/domain";

export const newsRecordSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().min(1),
  publishedAt: z.string().min(1),
  category: z.enum(NEWS_CATEGORIES),
  coverUrl: z.string().nullable(),
});

export type NewsRecord = z.infer<typeof newsRecordSchema>;

export const newsDatasetSchema = z.object({
  _mock: z.literal(true),
  _disclaimer: z.string(),
  items: z.array(newsRecordSchema),
});
