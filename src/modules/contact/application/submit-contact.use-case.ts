import type { ContactRepository, ContactSubmission } from "@/modules/contact/domain";

export class SubmitContactUseCase {
  constructor(private readonly repository: ContactRepository) {}

  async execute(submission: ContactSubmission): Promise<void> {
    await this.repository.submit(submission);
  }
}
