import type { ContactReasonSlug } from "./contact-reason.vo";

export interface ContactSubmission {
  name: string;
  email: string;
  organization: string | null;
  reason: ContactReasonSlug;
  message: string;
}

export interface ContactRepository {
  submit(submission: ContactSubmission): Promise<void>;
}
