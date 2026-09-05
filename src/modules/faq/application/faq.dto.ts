import type { FaqCategorySlug } from "@/modules/faq/domain";

export interface FaqItemDto {
  id: string;
  question: string;
  answer: string;
  category: FaqCategorySlug;
}

export interface FaqCategoryGroupDto {
  category: FaqCategorySlug;
  items: FaqItemDto[];
}
