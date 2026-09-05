"use client";

import { MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { EXHIBITOR_CATEGORIES } from "@/modules/exhibitors/domain";
import type { VenueZoneDto } from "@/modules/venue-map/application";
import { cn } from "@/shared/lib/utils";
import { FilterChip } from "@/shared/ui";

interface VenueMapProps {
  zones: VenueZoneDto[];
}

type CategoryFilter = string | "all";

function shortName(name: string): string {
  return name.replace(/\s*\(demo\)\s*/i, "").trim();
}

export function VenueMap({ zones }: VenueMapProps) {
  const t = useTranslations("venue");
  const categories = useTranslations("exhibitors");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<CategoryFilter>("all");

  const availableCategories = useMemo(() => {
    const present = new Set(zones.map((zone) => zone.category).filter(Boolean));
    return EXHIBITOR_CATEGORIES.filter((slug) => present.has(slug));
  }, [zones]);

  const selected = zones.find((zone) => zone.id === selectedId) ?? null;

  function zoneRectClasses(zone: VenueZoneDto): string {
    const isSelected = zone.id === selectedId;
    const matchesFilter = filter !== "all" && zone.category === filter;
    const dimmed = filter !== "all" && zone.category !== filter;

    if (isSelected) {
      return "fill-secondary stroke-secondary";
    }
    if (matchesFilter) {
      return "fill-accent-soft stroke-accent";
    }
    if (zone.kind === "pabellon") {
      return cn("fill-card stroke-border", dimmed && "opacity-40");
    }
    return cn("fill-muted stroke-border", dimmed && "opacity-40");
  }

  function zoneLabelClasses(zone: VenueZoneDto): string {
    const isSelected = zone.id === selectedId;
    const matchesFilter = filter !== "all" && zone.category === filter;
    if (isSelected) {
      return "fill-secondary-foreground";
    }
    if (matchesFilter) {
      return "fill-accent-soft-foreground";
    }
    return "fill-foreground";
  }

  return (
    <div className="space-y-6">
      <fieldset className="m-0 flex flex-wrap gap-2 border-0 p-0">
        <legend className="sr-only">{t("filterLabel")}</legend>
        <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>
          {t("allCategories")}
        </FilterChip>
        {availableCategories.map((slug) => (
          <FilterChip key={slug} active={filter === slug} onClick={() => setFilter(slug)}>
            {categories(`categories.${slug}`)}
          </FilterChip>
        ))}
      </fieldset>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <svg
            viewBox="0 0 800 490"
            className="h-auto w-full rounded-lg border border-border bg-background"
            role="img"
            aria-labelledby="venue-map-title"
          >
            <title id="venue-map-title">{t("mapLabel")}</title>
            {zones.map((zone) => (
              <g key={zone.id}>
                <rect
                  x={zone.x}
                  y={zone.y}
                  width={zone.width}
                  height={zone.height}
                  rx={10}
                  strokeWidth={2}
                  className={cn("transition-colors", zoneRectClasses(zone))}
                />
                <text
                  x={zone.x + zone.width / 2}
                  y={zone.y + zone.height / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className={cn("font-medium text-sm", zoneLabelClasses(zone))}
                >
                  {shortName(zone.name)}
                </text>
              </g>
            ))}
          </svg>

          <fieldset className="m-0 flex flex-wrap gap-2 border-0 p-0">
            <legend className="sr-only">{t("zonesLabel")}</legend>
            {zones.map((zone) => (
              <button
                key={zone.id}
                type="button"
                aria-pressed={zone.id === selectedId}
                onClick={() => setSelectedId(zone.id)}
                className={cn(
                  "rounded-md border px-3 py-1.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  zone.id === selectedId
                    ? "border-transparent bg-secondary text-secondary-foreground"
                    : "border-border bg-background text-muted-foreground hover:text-foreground",
                )}
              >
                {shortName(zone.name)}
              </button>
            ))}
          </fieldset>
        </div>

        <aside className="rounded-lg border border-border bg-card p-6 shadow-soft">
          {selected ? (
            <div className="space-y-3">
              <span className="inline-flex items-center rounded-full border border-transparent bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent-soft-foreground">
                {t(`kinds.${selected.kind}`)}
              </span>
              <h3 className="font-display text-xl text-card-foreground">
                {shortName(selected.name)}
              </h3>
              {selected.category ? (
                <p className="inline-flex items-center gap-2 text-sm text-brand-text">
                  <MapPin className="size-4 shrink-0" aria-hidden />
                  {categories(`categories.${selected.category}`)}
                </p>
              ) : null}
              <p className="text-sm text-muted-foreground">{selected.description}</p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">{t("selectPrompt")}</p>
          )}
        </aside>
      </div>
    </div>
  );
}
