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
    <div className="space-y-8">
      <fieldset className="mx-0 flex flex-wrap gap-2.5 border-0 p-0">
        <legend className="sr-only">{t("filterLabel")}</legend>
        <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>
          {t("allCategories")}
        </FilterChip>
        {availableCategories.map((slug) => (
          <FilterChip key={slug} active={filter === slug} onClick={() => setFilter(slug)}>
            <span className="inline-flex items-center gap-2">
              <span
                aria-hidden
                className={cn("size-2.5 shrink-0 rounded-full", CATEGORY_SWATCH[slug])}
              />
              {categories(`categories.${slug}`)}
            </span>
          </FilterChip>
        ))}
      </fieldset>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <svg
            viewBox="0 0 1240 860"
            className="h-auto w-full rounded-lg border border-border bg-background shadow-soft"
            role="img"
            aria-labelledby="venue-map-title"
          >
            <title id="venue-map-title">{t("mapLabel")}</title>
            <defs>
              <pattern id="venue-grid" width={38} height={38} patternUnits="userSpaceOnUse">
                <circle cx={1.5} cy={1.5} r={1.5} className="fill-border" />
              </pattern>
              <filter id="venue-zone-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow
                  dx={0}
                  dy={7}
                  stdDeviation={9}
                  floodColor="var(--color-neutral-950)"
                  floodOpacity={0.16}
                />
              </filter>
            </defs>

            <rect
              x={0}
              y={0}
              width={1240}
              height={860}
              fill="url(#venue-grid)"
              className="opacity-70"
            />

            <path
              d="M 120 96 L 1010 80 L 1200 92 L 1200 360 L 1150 470 Q 1190 566 1120 668 L 1092 780 L 300 838 L 150 816 L 96 604 L 118 352 Z"
              className="fill-card stroke-border"
              strokeWidth={2}
              strokeLinejoin="round"
              filter="url(#venue-zone-shadow)"
            />
            <circle cx={984} cy={648} r={64} className="fill-muted stroke-border" strokeWidth={2} />
            <circle
              cx={984}
              cy={648}
              r={38}
              className="fill-background stroke-border"
              strokeWidth={2}
            />

            {zones.map((zone) => {
              const isSelected = zone.id === selectedId;
              const isPabellon = zone.kind === "pabellon";
              return (
                <g key={zone.id} className="transition duration-300 ease-brand">
                  {isSelected ? (
                    <rect
                      x={zone.x - 5}
                      y={zone.y - 5}
                      width={zone.width + 10}
                      height={zone.height + 10}
                      rx={14}
                      strokeWidth={2}
                      className="fill-none stroke-secondary animate-pulse"
                    />
                  ) : null}
                  <rect
                    x={zone.x}
                    y={zone.y}
                    width={zone.width}
                    height={zone.height}
                    rx={12}
                    strokeWidth={isSelected ? 3 : 2}
                    filter={isPabellon ? "url(#venue-zone-shadow)" : undefined}
                    className={cn("transition", zoneRectClasses(zone))}
                  />
                  <text
                    x={zone.x + zone.width / 2}
                    y={zone.y + zone.height / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className={cn(
                      "pointer-events-none font-medium text-sm transition-opacity",
                      zoneLabelClasses(zone),
                    )}
                  >
                    {shortName(zone.name)}
                  </text>
                </g>
              );
            })}

            <circle cx={105} cy={600} r={12} className="fill-primary/25 animate-pulse" />
            <circle cx={105} cy={600} r={6} className="fill-primary" />

            <g className="pointer-events-none">
              <circle
                cx={1150}
                cy={132}
                r={30}
                className="fill-card stroke-border"
                strokeWidth={2}
              />
              <path d="M 1150 110 L 1158 133 L 1150 127 L 1142 133 Z" className="fill-secondary" />
              <text
                x={1150}
                y={152}
                textAnchor="middle"
                className="fill-muted-foreground font-semibold text-2xs"
              >
                N
              </text>
            </g>
          </svg>

          <fieldset className="mx-0 flex flex-wrap gap-2.5 border-0 p-0">
            <legend className="sr-only">{t("zonesLabel")}</legend>
            {zones.map((zone) => (
              <button
                key={zone.id}
                type="button"
                aria-pressed={zone.id === selectedId}
                onClick={() => setSelectedId(zone.id)}
                className={cn(
                  "rounded-md border px-3.5 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  zone.id === selectedId
                    ? "border-transparent bg-secondary text-secondary-foreground"
                    : "border-border bg-background text-muted-foreground hover:text-foreground",
                )}
              >
                {shortName(zone.name)}
              </button>
            ))}
          </fieldset>

          <p className="flex items-center gap-2 text-muted-foreground text-sm">
            <span
              aria-hidden
              className="size-3 shrink-0 rounded-sm border border-border bg-muted"
            />
            {t("zonesNote")}
          </p>
        </div>

        <aside className="self-start rounded-lg border border-border bg-card p-6 shadow-soft lg:sticky lg:top-24">
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
              {selected.highlights.length > 0 ? (
                <div className="space-y-3 border-border border-t pt-4">
                  <p className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
                    {t("highlightsTitle")}
                  </p>
                  <ul className="space-y-3">
                    {selected.highlights.map((highlight) => (
                      <li key={highlight.brand} className="space-y-0.5">
                        <p className="font-medium text-card-foreground text-sm">
                          {highlight.brand}
                        </p>
                        <p className="text-muted-foreground text-sm">{highlight.product}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">{t("selectPrompt")}</p>
          )}
        </aside>
      </div>
    </div>
  );
}
