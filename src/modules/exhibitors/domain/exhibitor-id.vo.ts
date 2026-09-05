export class ExhibitorId {
  private constructor(private readonly value: string) {}

  static create(value: string): ExhibitorId {
    const trimmed = value.trim();
    if (trimmed.length === 0) {
      throw new Error("ExhibitorId cannot be empty");
    }
    return new ExhibitorId(trimmed);
  }

  toString(): string {
    return this.value;
  }

  equals(other: ExhibitorId): boolean {
    return this.value === other.value;
  }
}
