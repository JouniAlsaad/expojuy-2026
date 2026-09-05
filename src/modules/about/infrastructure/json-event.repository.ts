import eventData from "@/data/event.json";
import type { EventRepository } from "@/modules/about/domain";
import { EventInfo } from "@/modules/about/domain";
import { eventInfoSchema } from "./event.schema";

export class JsonEventRepository implements EventRepository {
  private readonly event: EventInfo;

  constructor() {
    const record = eventInfoSchema.parse(eventData);
    this.event = EventInfo.create({
      edition: record.edition,
      startDate: record.startDate,
      endDate: record.endDate,
      venue: record.venue,
      city: record.city,
      stats: record.stats,
    });
  }

  async get(): Promise<EventInfo> {
    return this.event;
  }
}

export function createEventRepository(): EventRepository {
  return new JsonEventRepository();
}
