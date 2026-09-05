import type { ExhibitorRepository } from "@/modules/exhibitors/domain";
import type { ExhibitorDto } from "./exhibitor.dto";
import { toExhibitorDto } from "./exhibitor.mapper";

export class GetExhibitorsUseCase {
  constructor(private readonly repository: ExhibitorRepository) {}

  async execute(): Promise<ExhibitorDto[]> {
    const exhibitors = await this.repository.findAll();
    return exhibitors.map(toExhibitorDto);
  }
}
