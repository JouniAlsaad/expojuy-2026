import type { Exhibitor } from "./exhibitor.entity";
import type { ExhibitorCategorySlug } from "./exhibitor-category.vo";

export interface ExhibitorRepository {
  findAll(): Promise<Exhibitor[]>;
  findById(id: string): Promise<Exhibitor | null>;
  findByCategory(category: ExhibitorCategorySlug): Promise<Exhibitor[]>;
}
