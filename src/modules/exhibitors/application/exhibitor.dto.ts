import type { ExhibitorCategorySlug } from "@/modules/exhibitors/domain";

export interface ExhibitorDto {
  id: string;
  name: string;
  slug: string;
  category: ExhibitorCategorySlug;
  summary: string;
  booth: string;
  boothCode: string;
  website: string | null;
  logoUrl: string | null;
  featured: boolean;
}
