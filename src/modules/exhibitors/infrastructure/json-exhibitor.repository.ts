import exhibitorsData from "@/data/exhibitors.json";
import type { ExhibitorCategorySlug, ExhibitorRepository } from "@/modules/exhibitors/domain";
import {
  BoothLocation,
  Exhibitor,
  ExhibitorCategory,
  ExhibitorId,
} from "@/modules/exhibitors/domain";
import { type ExhibitorRecord, exhibitorDatasetSchema } from "./exhibitor.schema";

function toEntity(record: ExhibitorRecord): Exhibitor {
  return Exhibitor.create({
    id: ExhibitorId.create(record.id),
    name: record.name,
    slug: record.slug,
    category: ExhibitorCategory.create(record.category),
    summary: record.summary,
    booth: BoothLocation.create({ pavilion: record.pavilion, code: record.booth }),
    website: record.website,
    logoUrl: record.logoUrl,
    featured: record.featured,
  });
}

export class JsonExhibitorRepository implements ExhibitorRepository {
  private readonly exhibitors: Exhibitor[];

  constructor() {
    const dataset = exhibitorDatasetSchema.parse(exhibitorsData);
    this.exhibitors = dataset.items.map(toEntity);
  }

  async findAll(): Promise<Exhibitor[]> {
    return this.exhibitors;
  }

  async findById(id: string): Promise<Exhibitor | null> {
    return this.exhibitors.find((exhibitor) => exhibitor.id.toString() === id) ?? null;
  }

  async findByCategory(category: ExhibitorCategorySlug): Promise<Exhibitor[]> {
    return this.exhibitors.filter((exhibitor) => exhibitor.category.value === category);
  }
}

export function createExhibitorRepository(): ExhibitorRepository {
  return new JsonExhibitorRepository();
}
