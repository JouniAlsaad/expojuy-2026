import type { SessionRepository } from "@/modules/agenda/domain";
import type { AgendaDayDto } from "./session.dto";
import { toSessionDto } from "./session.mapper";

const dayFormatter = new Intl.DateTimeFormat("es-AR", {
  weekday: "long",
  day: "numeric",
  month: "long",
});

function formatDayLabel(day: string): string {
  const date = new Date(`${day}T00:00:00`);
  const label = dayFormatter.format(date);
  return label.charAt(0).toUpperCase() + label.slice(1);
}

export class GetAgendaByDayUseCase {
  constructor(private readonly repository: SessionRepository) {}

  async execute(): Promise<AgendaDayDto[]> {
    const sessions = await this.repository.findAll();
    const days = [...new Set(sessions.map((session) => session.slot.day))].sort();

    return days.map((day) => ({
      day,
      dayLabel: formatDayLabel(day),
      sessions: sessions
        .filter((session) => session.slot.day === day)
        .sort((a, b) => a.slot.start.localeCompare(b.slot.start))
        .map(toSessionDto),
    }));
  }
}
