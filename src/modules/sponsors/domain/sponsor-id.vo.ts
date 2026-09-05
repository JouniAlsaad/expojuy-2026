export class SponsorId {
  private constructor(private readonly value: string) {}

  static create(value: string): SponsorId {
    const trimmed = value.trim();
    if (trimmed.length === 0) {
      throw new Error("SponsorId cannot be empty");
    }
    return new SponsorId(trimmed);
  }

  toString(): string {
    return this.value;
  }

  equals(other: SponsorId): boolean {
    return this.value === other.value;
  }
}
