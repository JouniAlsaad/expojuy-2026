import type { FaqItem } from "./faq-item.entity";

export interface FaqRepository {
  findAll(): Promise<FaqItem[]>;
}
