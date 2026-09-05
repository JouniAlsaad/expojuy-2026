import type { ContactRepository, ContactSubmission } from "@/modules/contact/domain";

export class MockContactRepository implements ContactRepository {
  async submit(_submission: ContactSubmission): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 600));
  }
}

export function createContactRepository(): ContactRepository {
  return new MockContactRepository();
}
