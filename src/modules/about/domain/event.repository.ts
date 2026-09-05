import type { EventInfo } from "./event-info.entity";

export interface EventRepository {
  get(): Promise<EventInfo>;
}
