import type { FaqItem } from "@/modules/faq/domain";
import type { FaqItemDto } from "./faq.dto";

export function toFaqItemDto(item: FaqItem): FaqItemDto {
  return {
    id: item.id,
    question: item.question,
    answer: item.answer,
    category: item.category.value,
  };
}
