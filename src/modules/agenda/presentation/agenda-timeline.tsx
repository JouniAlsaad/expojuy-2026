"use client";

import { ChevronDown, Clock, MapPin, Mic } from "lucide-react";
import { useTranslations } from "next-intl";
import { useId, useMemo, useState } from "react";
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
  const panelIdBase = useId();
  const [activeTrack, setActiveTrack] = useState<TrackFilter>("all");
  const [openDays, setOpenDays] = useState<Set<string>>(
    () => new Set(days[0] ? [days[0].day] : []),
  );

  const availableTracks = useMemo(() => {
    const tracks = new Set<AgendaTrackSlug>();
    for (const day of days) {
      for (const session of day.sessions) {
        tracks.add(session.track);
      }
    }
    return [...tracks];
  }, [days]);

  const visibleDays = useMemo(
    () =>
      days
        .map((day) => ({
          ...day,
          sessions:
            activeTrack === "all"
              ? day.sessions
              : day.sessions.filter((session) => session.track === activeTrack),
        }))
        .filter((day) => day.sessions.length > 0),
    [days, activeTrack],
  );

  const toggleDay = (day: string) => {
    setOpenDays((current) => {
      const next = new Set(current);
      if (next.has(day)) {
        next.delete(day);
      } else {
        next.add(day);
      }
      return next;
    });
  };

  if (days.length === 0) {
    return <p className="text-muted-foreground">{t("empty")}</p>;
  }

  return (
    <div className="space-y-8">
      <div role="group" aria-label={t("trackFilterLabel")} className="flex flex-wrap gap-2">
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
      </div>

      {visibleDays.length === 0 ? (
        <p className="text-muted-foreground">{t("noSessions")}</p>
      ) : (
        <div className="space-y-3" aria-label={t("daysLabel")}>
          {visibleDays.map((day) => {
            const isOpen = openDays.has(day.day);
            const panelId = `${panelIdBase}-${day.day}`;

            return (
              <section
                key={day.day}
                className="overflow-hidden rounded-lg border border-border bg-card shadow-soft"
              >
                <h3 className="m-0">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    aria-label={isOpen ? t("collapseDay", { day: day.dayLabel }) : t("expandDay", { day: day.dayLabel })}
                    onClick={() => toggleDay(day.day)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
                  >
                    <span className="flex flex-col gap-0.5">
                      <span className="font-display text-lg text-card-foreground">
                        {day.dayLabel}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {t("sessionCount", { count: day.sessions.length })}
                      </span>
                    </span>
                    <ChevronDown
                      className={cn(
                        "size-5 shrink-0 text-muted-foreground transition-transform",
                        isOpen && "rotate-180",
                      )}
                      aria-hidden
                    />
                  </button>
                </h3>

                <div id={panelId} hidden={!isOpen} className="border-t border-border px-5 py-4">
                  <ol className="space-y-4">
                    {day.sessions.map((session) => (
                      <li
                        key={session.id}
                        className="flex flex-col gap-3 rounded-md border border-border bg-background p-4 md:flex-row md:items-start md:gap-6"
                      >
                        <div className="flex items-center gap-2 text-sm font-semibold text-brand-text md:w-40 md:shrink-0">
                          <Clock className="size-4 shrink-0" aria-hidden />
                          <span>{session.timeRange}</span>
                        </div>
                        <div className="flex-1 space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className="font-display text-base text-card-foreground">
                              {session.title}
                            </h4>
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
                </div>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
