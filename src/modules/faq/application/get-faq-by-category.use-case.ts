import { FAQ_CATEGORIES, type FaqRepository } from "@/modules/faq/domain";
import type { FaqCategoryGroupDto } from "./faq.dto";
import { toFaqItemDto } from "./faq.mapper";

export class GetFaqByCategoryUseCase {
  constructor(private readonly repository: FaqRepository) {}

  async execute(): Promise<FaqCategoryGroupDto[]> {
    const items = await this.repository.findAll();
    return FAQ_CATEGORIES.map((category) => ({
      category,
      items: items.filter((item) => item.category.value === category).map(toFaqItemDto),
    })).filter((group) => group.items.length > 0);
  }
}
