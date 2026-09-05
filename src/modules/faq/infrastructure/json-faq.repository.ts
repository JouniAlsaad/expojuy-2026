import faqData from "@/data/faq.json";
import type { FaqRepository } from "@/modules/faq/domain";
import { FaqCategory, FaqItem } from "@/modules/faq/domain";
import { type FaqRecord, faqDatasetSchema } from "./faq.schema";

function toEntity(record: FaqRecord): FaqItem {
  return FaqItem.create({
    id: record.id,
    question: record.question,
    answer: record.answer,
    category: FaqCategory.create(record.category),
  });
}

export class JsonFaqRepository implements FaqRepository {
  private readonly items: FaqItem[];

  constructor() {
    const dataset = faqDatasetSchema.parse(faqData);
    this.items = dataset.items.map(toEntity);
  }

  async findAll(): Promise<FaqItem[]> {
    return this.items;
  }
}

export function createFaqRepository(): FaqRepository {
  return new JsonFaqRepository();
}
