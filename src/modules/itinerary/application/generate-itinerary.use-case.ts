import type { SessionDto } from "@/modules/agenda/application";
import type { ExhibitorDto } from "@/modules/exhibitors/application";
import type { ItineraryDto, ItineraryStopDto, RoutePreferences } from "./itinerary.dto";

const STAND_MINUTES = 25;
const MAX_STANDS = 4;

function toMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function sessionDuration(session: SessionDto): number {
  const duration = toMinutes(session.endTime) - toMinutes(session.startTime);
  return duration > 0 ? duration : 60;
}

export class GenerateItineraryUseCase {
  execute(
    sessions: SessionDto[],
    exhibitors: ExhibitorDto[],
    preferences: RoutePreferences,
  ): ItineraryDto {
    const { interests, maxMinutes, day } = preferences;
    const stops: ItineraryStopDto[] = [];
    let used = 0;

    const daySessions = sessions
      .filter((session) => session.day === day)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));

    const matchingSessions = daySessions.filter(
      (session) =>
        interests.length === 0 ||
        interests.includes(session.track) ||
        session.track === "institucional",
    );

    for (const session of matchingSessions) {
      const duration = sessionDuration(session);
      if (used + duration > maxMinutes) {
        continue;
      }
      used += duration;
      stops.push({
        kind: "session",
        time: session.timeRange,
        title: session.title,
        subtitle: session.speaker,
        category: session.track,
      });
    }

    const pool = exhibitors
      .filter((exhibitor) => interests.length === 0 || interests.includes(exhibitor.category))
      .sort((a, b) => Number(b.featured) - Number(a.featured));

    let standCount = 0;
    for (const exhibitor of pool) {
      if (standCount >= MAX_STANDS || used + STAND_MINUTES > maxMinutes) {
        break;
      }
      used += STAND_MINUTES;
      standCount += 1;
      stops.push({
        kind: "stand",
        time: null,
        title: exhibitor.name,
        subtitle: exhibitor.booth,
        category: exhibitor.category,
      });
    }

    return { day, stops, estimatedMinutes: used };
  }
}
