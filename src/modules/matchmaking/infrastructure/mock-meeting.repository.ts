import type { MeetingRepository, MeetingRequest } from "@/modules/matchmaking/domain";

export class MockMeetingRepository implements MeetingRepository {
  async submit(_request: MeetingRequest): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 600));
  }
}

export function createMeetingRepository(): MeetingRepository {
  return new MockMeetingRepository();
}
