import type { ExhibitorRepository } from "@/modules/exhibitors/domain";
import type { ExhibitorDto } from "./exhibitor.dto";
import { toExhibitorDto } from "./exhibitor.mapper";

export class GetExhibitorByIdUseCase {
  constructor(private readonly repository: ExhibitorRepository) {}

  async execute(id: string): Promise<ExhibitorDto | null> {
    const exhibitor = await this.repository.findById(id);
    return exhibitor === null ? null : toExhibitorDto(exhibitor);
  }
}
