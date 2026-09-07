import type { MeetingRepository, MeetingRequest } from "@/modules/matchmaking/domain";

export class SubmitMeetingRequestUseCase {
  constructor(private readonly repository: MeetingRepository) {}

  async execute(request: MeetingRequest): Promise<void> {
    await this.repository.submit(request);
  }
}
