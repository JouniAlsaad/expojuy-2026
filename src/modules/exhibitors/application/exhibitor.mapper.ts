import type { Exhibitor } from "@/modules/exhibitors/domain";
import type { ExhibitorDto } from "./exhibitor.dto";

export function toExhibitorDto(exhibitor: Exhibitor): ExhibitorDto {
  const booth = exhibitor.booth.value;
  return {
    id: exhibitor.id.toString(),
    name: exhibitor.name,
    slug: exhibitor.slug,
    category: exhibitor.category.value,
    summary: exhibitor.summary,
    booth: exhibitor.booth.toString(),
    boothCode: booth.code,
    website: exhibitor.website,
    logoUrl: exhibitor.logoUrl,
    featured: exhibitor.isFeatured,
  };
}
