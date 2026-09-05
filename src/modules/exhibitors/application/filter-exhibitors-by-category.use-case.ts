import type { ExhibitorCategorySlug, ExhibitorRepository } from "@/modules/exhibitors/domain";
import type { ExhibitorDto } from "./exhibitor.dto";
import { toExhibitorDto } from "./exhibitor.mapper";

export class FilterExhibitorsByCategoryUseCase {
  constructor(private readonly repository: ExhibitorRepository) {}

  async execute(category: ExhibitorCategorySlug): Promise<ExhibitorDto[]> {
    const exhibitors = await this.repository.findByCategory(category);
    return exhibitors.map(toExhibitorDto);
  }
}
