export interface MeetingRequest {
  exhibitorId: string;
  exhibitorName: string;
  slotId: string;
  slotLabel: string;
  requesterName: string;
  company: string;
  email: string;
  message: string | null;
}

export interface MeetingRepository {
  submit(request: MeetingRequest): Promise<void>;
}
