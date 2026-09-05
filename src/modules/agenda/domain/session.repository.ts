import type { AgendaTrackSlug } from "./agenda-track.vo";
import type { Session } from "./session.entity";

export interface SessionRepository {
  findAll(): Promise<Session[]>;
  findByTrack(track: AgendaTrackSlug): Promise<Session[]>;
}
