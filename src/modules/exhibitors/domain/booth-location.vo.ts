export interface BoothLocationProps {
  pavilion: string;
  code: string;
}

export class BoothLocation {
  private constructor(
    private readonly pavilion: string,
    private readonly code: string,
  ) {}

  static create(props: BoothLocationProps): BoothLocation {
    if (props.code.trim().length === 0) {
      throw new Error("Booth code cannot be empty");
    }
    return new BoothLocation(props.pavilion.trim(), props.code.trim());
  }

  get value(): BoothLocationProps {
    return { pavilion: this.pavilion, code: this.code };
  }

  toString(): string {
    return `${this.pavilion} · ${this.code}`;
  }
}
