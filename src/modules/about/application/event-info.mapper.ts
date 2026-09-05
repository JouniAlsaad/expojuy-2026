import type { EventInfo } from "@/modules/about/domain";
import type { EventInfoDto } from "./event-info.dto";

const monthFormatter = new Intl.DateTimeFormat("es-AR", { month: "long" });

function buildDatesLabel(startIso: string, endIso: string): string {
  const start = new Date(`${startIso}T00:00:00`);
  const end = new Date(`${endIso}T00:00:00`);
  const startDay = start.getDate();
  const endDay = end.getDate();
  const month = monthFormatter.format(end);
  const year = end.getFullYear();
  return `${startDay} al ${endDay} de ${month} de ${year}`;
}

export function toEventInfoDto(event: EventInfo): EventInfoDto {
  return {
    edition: event.edition,
    startDate: event.startDate,
    endDate: event.endDate,
    datesLabel: buildDatesLabel(event.startDate, event.endDate),
    venue: event.venue,
    city: event.city,
    stats: event.stats,
  };
}
