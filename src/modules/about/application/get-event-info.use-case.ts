import type { EventRepository } from "@/modules/about/domain";
import type { EventInfoDto } from "./event-info.dto";
import { toEventInfoDto } from "./event-info.mapper";

export class GetEventInfoUseCase {
  constructor(private readonly repository: EventRepository) {}

  async execute(): Promise<EventInfoDto> {
    const event = await this.repository.get();
    return toEventInfoDto(event);
  }
}
