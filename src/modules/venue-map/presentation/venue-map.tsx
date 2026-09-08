"use client";

import { MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import type { ExhibitorCategorySlug } from "@/modules/exhibitors/domain";
import { EXHIBITOR_CATEGORIES } from "@/modules/exhibitors/domain";
import type { VenueZoneDto } from "@/modules/venue-map/application";
import { cn } from "@/shared/lib/utils";
import { FilterChip } from "@/shared/ui";

interface VenueMapProps {
  zones: VenueZoneDto[];
}

type CategoryFilter = string | "all";

const CATEGORY_FILL: Record<ExhibitorCategorySlug, string> = {
  "mineria-energia": "fill-cat-mineria-energia",
  agroindustria: "fill-cat-agroindustria",
  turismo: "fill-cat-turismo",
  tecnologia: "fill-cat-tecnologia",
  artesanias: "fill-cat-artesanias",
  gastronomia: "fill-cat-gastronomia",
  servicios: "fill-cat-servicios",
};

const CATEGORY_SWATCH: Record<ExhibitorCategorySlug, string> = {
  "mineria-energia": "bg-cat-mineria-energia",
  agroindustria: "bg-cat-agroindustria",
  turismo: "bg-cat-turismo",
  tecnologia: "bg-cat-tecnologia",
  artesanias: "bg-cat-artesanias",
  gastronomia: "bg-cat-gastronomia",
  servicios: "bg-cat-servicios",
};

function isCategorySlug(value: string | null): value is ExhibitorCategorySlug {
  return value !== null && (EXHIBITOR_CATEGORIES as readonly string[]).includes(value);
}

function shortName(name: string): string {
  return name.replace(/\s*\((?:demo|ficticio)\)\s*/i, "").trim();
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

  function zoneBaseFill(zone: VenueZoneDto): string {
    if (isCategorySlug(zone.category)) {
      return CATEGORY_FILL[zone.category];
    }
    return zone.kind === "pabellon" ? "fill-card" : "fill-muted";
  }

  function zoneRectClasses(zone: VenueZoneDto): string {
    const isSelected = zone.id === selectedId;
    if (isSelected) {
      return "fill-secondary stroke-secondary";
    }
    const matchesFilter = filter !== "all" && zone.category === filter;
    const dimmed = filter !== "all" && zone.category !== filter;
    return cn(
      zoneBaseFill(zone),
      matchesFilter ? "stroke-accent" : "stroke-border",
      dimmed && "opacity-40",
    );
  }

  function zoneLabelClasses(zone: VenueZoneDto): string {
    if (zone.id === selectedId) {
      return "fill-secondary-foreground";
    }
    const dimmed = filter !== "all" && zone.category !== filter;
    return cn("fill-foreground", dimmed && "opacity-40");
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
            viewBox="0 0 1240 860"
            className="h-auto w-full rounded-lg border border-border bg-background"
            role="img"
            aria-labelledby="venue-map-title"
          >
            <title id="venue-map-title">{t("mapLabel")}</title>
            <path
              d="M 120 96 L 1010 80 L 1200 92 L 1200 360 L 1150 470 Q 1190 566 1120 668 L 1092 780 L 300 838 L 150 816 L 96 604 L 118 352 Z"
              className="fill-card stroke-border"
              strokeWidth={2}
              strokeLinejoin="round"
            />
            <circle cx={984} cy={648} r={64} className="fill-muted stroke-border" strokeWidth={2} />
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
                  className={cn("font-medium text-sm transition-opacity", zoneLabelClasses(zone))}
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

          <div className="space-y-3 rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium text-sm text-card-foreground">{t("legendTitle")}</h3>
            <div className="space-y-1.5">
              <p className="text-xs font-medium text-muted-foreground">
                {t("legendCategoriesTitle")}
              </p>
              <ul className="flex flex-wrap gap-x-4 gap-y-2">
                {EXHIBITOR_CATEGORIES.map((slug) => (
                  <li
                    key={slug}
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground"
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "size-3 shrink-0 rounded-sm border border-border",
                        CATEGORY_SWATCH[slug],
                      )}
                    />
                    {categories(`categories.${slug}`)}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-1.5">
              <p className="text-xs font-medium text-muted-foreground">{t("legendKindsTitle")}</p>
              <ul className="flex flex-wrap gap-x-4 gap-y-2">
                <li className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <span
                    aria-hidden
                    className="size-3 shrink-0 rounded-sm border border-border bg-card"
                  />
                  {t("legendPabellon")}
                </li>
                <li className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                  <span
                    aria-hidden
                    className="size-3 shrink-0 rounded-sm border border-border bg-muted"
                  />
                  {t("legendCommon")}
                </li>
              </ul>
            </div>
          </div>
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
