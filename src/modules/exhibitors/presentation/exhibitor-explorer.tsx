"use client";

import { MapPin, Search, Star } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import type { ExhibitorDto } from "@/modules/exhibitors/application";
import { EXHIBITOR_CATEGORIES, type ExhibitorCategorySlug } from "@/modules/exhibitors/domain";
import { FilterChip } from "@/shared/ui";

interface ExhibitorExplorerProps {
  exhibitors: ExhibitorDto[];
}

type CategoryFilter = ExhibitorCategorySlug | "all";

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

export function ExhibitorExplorer({ exhibitors }: ExhibitorExplorerProps) {
  const t = useTranslations("exhibitors");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryFilter>("all");

  const availableCategories = useMemo(() => {
    const present = new Set(exhibitors.map((exhibitor) => exhibitor.category));
    return EXHIBITOR_CATEGORIES.filter((slug) => present.has(slug));
  }, [exhibitors]);

  const normalizedQuery = normalize(query.trim());

  const filtered = exhibitors.filter((exhibitor) => {
    const matchesCategory = category === "all" || exhibitor.category === category;
    const matchesQuery =
      normalizedQuery.length === 0 ||
      normalize(exhibitor.name).includes(normalizedQuery) ||
      normalize(exhibitor.summary).includes(normalizedQuery);
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search
          className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 size-5 text-muted-foreground"
          aria-hidden
        />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t("searchPlaceholder")}
          aria-label={t("searchPlaceholder")}
          className="w-full rounded-md border border-input bg-background py-2 pr-3 pl-10 text-base text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background md:text-sm"
        />
      </div>

      <fieldset className="m-0 flex flex-wrap gap-2 border-0 p-0">
        <legend className="sr-only">{t("filterLabel")}</legend>
        <FilterChip active={category === "all"} onClick={() => setCategory("all")}>
          {t("allCategories")}
        </FilterChip>
        {availableCategories.map((slug) => (
          <FilterChip key={slug} active={category === slug} onClick={() => setCategory(slug)}>
            {t(`categories.${slug}`)}
          </FilterChip>
        ))}
      </fieldset>

      <p className="text-sm text-muted-foreground" aria-live="polite">
        {t("results", { count: filtered.length })}
      </p>

      {filtered.length === 0 ? (
        <p className="text-muted-foreground">{t("noResults")}</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((exhibitor) => (
            <article
              key={exhibitor.id}
              className="flex flex-col gap-3 rounded-lg border border-border bg-card p-5 shadow-soft transition-shadow hover:shadow-elevated"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-display text-lg text-card-foreground">{exhibitor.name}</h3>
                {exhibitor.featured ? (
                  <Star className="size-5 shrink-0 fill-primary text-primary" aria-hidden />
                ) : null}
              </div>
              <span className="w-fit rounded-full border border-transparent bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent-soft-foreground">
                {t(`categories.${exhibitor.category}`)}
              </span>
              <p className="text-sm text-muted-foreground">{exhibitor.summary}</p>
              <div className="mt-auto flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="size-4 shrink-0" aria-hidden />
                <span>{exhibitor.booth}</span>
              </div>
              {exhibitor.website ? (
                <a
                  href={exhibitor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-brand-text hover:underline"
                >
                  {t("website")}
                </a>
              ) : null}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
