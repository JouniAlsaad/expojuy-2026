import type { Session } from "@/modules/agenda/domain";
import type { SessionDto } from "./session.dto";

export function toSessionDto(session: Session): SessionDto {
  return {
    id: session.id,
    title: session.title,
    speaker: session.speaker,
    stage: session.stage,
    track: session.track.value,
    day: session.slot.day,
    startTime: session.slot.start,
    endTime: session.slot.end,
    timeRange: session.slot.range,
  };
}
