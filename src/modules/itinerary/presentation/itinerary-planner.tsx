"use client";

import { Clock, Mic, Sparkles, Store } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import type { SessionDto } from "@/modules/agenda/application";
import type { ExhibitorDto } from "@/modules/exhibitors/application";
import { EXHIBITOR_CATEGORIES } from "@/modules/exhibitors/domain";
import { GenerateItineraryUseCase, type ItineraryDto } from "@/modules/itinerary/application";
import { cn } from "@/shared/lib/utils";
import { FilterChip } from "@/shared/ui";
import { buttonVariants } from "@/shared/ui/button";

interface DayOption {
  day: string;
  dayLabel: string;
}

interface ItineraryPlannerProps {
  sessions: SessionDto[];
  exhibitors: ExhibitorDto[];
  days: DayOption[];
}

const TIME_OPTIONS = [
  { key: "short", minutes: 120 },
  { key: "half", minutes: 240 },
  { key: "full", minutes: 600 },
] as const;

const generator = new GenerateItineraryUseCase();

export function ItineraryPlanner({ sessions, exhibitors, days }: ItineraryPlannerProps) {
  const t = useTranslations("itinerary");
  const [interests, setInterests] = useState<Set<string>>(new Set());
  const [day, setDay] = useState(days[0]?.day ?? "");
  const [minutes, setMinutes] = useState<number>(240);
  const [result, setResult] = useState<ItineraryDto | null>(null);

  function toggleInterest(slug: string) {
    setInterests((previous) => {
      const next = new Set(previous);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  }

  function generate() {
    setResult(
      generator.execute(sessions, exhibitors, {
        interests: [...interests],
        maxMinutes: minutes,
        day,
      }),
    );
  }

  function durationLabel(total: number): string {
    const hours = Math.floor(total / 60);
    const mins = total % 60;
    if (hours > 0 && mins > 0) {
      return `${hours} ${t("hoursShort")} ${mins} ${t("minutesShort")}`;
    }
    if (hours > 0) {
      return `${hours} ${t("hoursShort")}`;
    }
    return `${mins} ${t("minutesShort")}`;
  }

  const dayLabel = days.find((option) => option.day === day)?.dayLabel ?? "";

  if (result) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col gap-2 rounded-lg border border-border bg-card p-6 shadow-soft">
          <span className="inline-flex items-center gap-2 font-semibold text-brand-text text-sm">
            <Sparkles className="size-4 shrink-0" aria-hidden />
            {t("result.badge")}
          </span>
          <h2 className="font-display text-2xl text-card-foreground">
            {t("result.title", { day: dayLabel })}
          </h2>
          <p className="inline-flex items-center gap-2 text-muted-foreground text-sm">
            <Clock className="size-4 shrink-0" aria-hidden />
            {t("result.estimated", { time: durationLabel(result.estimatedMinutes) })}
          </p>
        </div>

        {result.stops.length === 0 ? (
          <p className="text-muted-foreground">{t("result.empty")}</p>
        ) : (
          <ol className="space-y-4">
            {result.stops.map((stop, index) => (
              <li
                key={`${stop.kind}-${stop.title}`}
                className="flex gap-4 rounded-lg border border-border bg-card p-5 shadow-soft"
              >
                <span
                  className="inline-flex size-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary"
                  aria-hidden
                >
                  {stop.kind === "session" ? (
                    <Mic className="size-5" />
                  ) : (
                    <Store className="size-5" />
                  )}
                </span>
                <div className="flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-semibold text-muted-foreground text-xs">
                      {index + 1}. {t(`kinds.${stop.kind}`)}
                    </span>
                    {stop.category ? (
                      <span className="inline-flex items-center rounded-full border border-transparent bg-accent-soft px-2 py-0.5 text-accent-soft-foreground text-xs">
                        {t(`rubros.${stop.category}`)}
                      </span>
                    ) : null}
                    {stop.time ? (
                      <span className="text-brand-text text-xs">{stop.time}</span>
                    ) : null}
                  </div>
                  <h3 className="font-display text-card-foreground text-lg">{stop.title}</h3>
                  <p className="text-muted-foreground text-sm">{stop.subtitle}</p>
                </div>
              </li>
            ))}
          </ol>
        )}

        <p className="text-muted-foreground text-xs">{t("disclaimer")}</p>

        <button
          type="button"
          onClick={() => setResult(null)}
          className={cn(buttonVariants({ variant: "outline", size: "md" }))}
        >
          {t("result.again")}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 rounded-lg border border-border bg-card p-6 shadow-soft md:p-8">
      <fieldset className="m-0 border-0 p-0">
        <legend className="mb-3 font-semibold text-foreground text-sm">
          {t("form.interests")}
        </legend>
        <div className="flex flex-wrap gap-2">
          {EXHIBITOR_CATEGORIES.map((slug) => (
            <FilterChip
              key={slug}
              active={interests.has(slug)}
              onClick={() => toggleInterest(slug)}
            >
              {t(`rubros.${slug}`)}
            </FilterChip>
          ))}
        </div>
      </fieldset>

      <fieldset className="m-0 border-0 p-0">
        <legend className="mb-3 font-semibold text-foreground text-sm">{t("form.day")}</legend>
        <div className="flex flex-wrap gap-2">
          {days.map((option) => (
            <FilterChip
              key={option.day}
              active={day === option.day}
              onClick={() => setDay(option.day)}
            >
              {option.dayLabel}
            </FilterChip>
          ))}
        </div>
      </fieldset>

      <fieldset className="m-0 border-0 p-0">
        <legend className="mb-3 font-semibold text-foreground text-sm">{t("form.time")}</legend>
        <div className="flex flex-wrap gap-2">
          {TIME_OPTIONS.map((option) => (
            <FilterChip
              key={option.key}
              active={minutes === option.minutes}
              onClick={() => setMinutes(option.minutes)}
            >
              {t(`form.times.${option.key}`)}
            </FilterChip>
          ))}
        </div>
      </fieldset>

      <button
        type="button"
        onClick={generate}
        className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
      >
        <Sparkles className="size-5" aria-hidden />
        {t("form.generate")}
      </button>
    </div>
  );
}
