"use client";

import { Clock, MapPin, Mic } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import type { AgendaDayDto } from "@/modules/agenda/application";
import type { AgendaTrackSlug } from "@/modules/agenda/domain";
import { cn } from "@/shared/lib/utils";
import { FilterChip } from "@/shared/ui";

interface AgendaTimelineProps {
  days: AgendaDayDto[];
}

type TrackFilter = AgendaTrackSlug | "all";

export function AgendaTimeline({ days }: AgendaTimelineProps) {
  const t = useTranslations("agenda");
  const [activeDay, setActiveDay] = useState(days[0]?.day ?? "");
  const [activeTrack, setActiveTrack] = useState<TrackFilter>("all");

  const currentDay = days.find((day) => day.day === activeDay) ?? days[0];

  const availableTracks = useMemo(() => {
    const tracks = new Set<AgendaTrackSlug>();
    for (const day of days) {
      for (const session of day.sessions) {
        tracks.add(session.track);
      }
    }
    return [...tracks];
  }, [days]);

  const visibleSessions = currentDay
    ? currentDay.sessions.filter(
        (session) => activeTrack === "all" || session.track === activeTrack,
      )
    : [];

  if (days.length === 0) {
    return <p className="text-muted-foreground">{t("empty")}</p>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2" role="tablist" aria-label={t("dayTabsLabel")}>
        {days.map((day) => (
          <button
            key={day.day}
            type="button"
            role="tab"
            aria-selected={day.day === activeDay}
            onClick={() => setActiveDay(day.day)}
            className={cn(
              "rounded-md border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              day.day === activeDay
                ? "border-transparent bg-primary text-primary-foreground"
                : "border-border bg-background text-muted-foreground hover:text-foreground",
            )}
          >
            {day.dayLabel}
          </button>
        ))}
      </div>

      <fieldset className="m-0 flex flex-wrap gap-2 border-0 p-0">
        <legend className="sr-only">{t("trackFilterLabel")}</legend>
        <FilterChip active={activeTrack === "all"} onClick={() => setActiveTrack("all")}>
          {t("allTracks")}
        </FilterChip>
        {availableTracks.map((track) => (
          <FilterChip
            key={track}
            active={activeTrack === track}
            onClick={() => setActiveTrack(track)}
          >
            {t(`tracks.${track}`)}
          </FilterChip>
        ))}
      </fieldset>

      {visibleSessions.length === 0 ? (
        <p className="text-muted-foreground">{t("noSessions")}</p>
      ) : (
        <ol className="space-y-4">
          {visibleSessions.map((session) => (
            <li
              key={session.id}
              className="flex flex-col gap-3 rounded-lg border border-border bg-card p-5 shadow-soft md:flex-row md:items-start md:gap-6"
            >
              <div className="flex items-center gap-2 text-sm font-semibold text-brand-text md:w-40 md:shrink-0">
                <Clock className="size-4 shrink-0" aria-hidden />
                <span>{session.timeRange}</span>
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-lg text-card-foreground">{session.title}</h3>
                  <span className="inline-flex items-center rounded-full border border-transparent bg-accent-soft px-2.5 py-0.5 text-xs font-medium text-accent-soft-foreground">
                    {t(`tracks.${session.track}`)}
                  </span>
                </div>
                <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-2">
                    <Mic className="size-4 shrink-0" aria-hidden />
                    {session.speaker}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="size-4 shrink-0" aria-hidden />
                    {session.stage}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
