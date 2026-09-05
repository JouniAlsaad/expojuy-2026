import agendaData from "@/data/agenda.json";
import type { AgendaTrackSlug, SessionRepository } from "@/modules/agenda/domain";
import { AgendaTrack, Session, TimeSlot } from "@/modules/agenda/domain";
import { agendaDatasetSchema, type SessionRecord } from "./session.schema";

function toEntity(record: SessionRecord): Session {
  return Session.create({
    id: record.id,
    title: record.title,
    speaker: record.speaker,
    stage: record.stage,
    track: AgendaTrack.create(record.track),
    slot: TimeSlot.create({ day: record.day, start: record.startTime, end: record.endTime }),
  });
}

export class JsonSessionRepository implements SessionRepository {
  private readonly sessions: Session[];

  constructor() {
    const dataset = agendaDatasetSchema.parse(agendaData);
    this.sessions = dataset.items.map(toEntity);
  }

  async findAll(): Promise<Session[]> {
    return this.sessions;
  }

  async findByTrack(track: AgendaTrackSlug): Promise<Session[]> {
    return this.sessions.filter((session) => session.track.value === track);
  }
}

export function createSessionRepository(): SessionRepository {
  return new JsonSessionRepository();
}
