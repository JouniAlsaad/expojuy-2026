import type { AgendaTrackSlug } from "@/modules/agenda/domain";

export interface SessionDto {
  id: string;
  title: string;
  speaker: string;
  stage: string;
  track: AgendaTrackSlug;
  day: string;
  startTime: string;
  endTime: string;
  timeRange: string;
}

export interface AgendaDayDto {
  day: string;
  dayLabel: string;
  sessions: SessionDto[];
}
