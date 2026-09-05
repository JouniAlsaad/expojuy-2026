export interface TimeSlotProps {
  day: string;
  start: string;
  end: string;
}

export class TimeSlot {
  private constructor(private readonly props: TimeSlotProps) {}

  static create(props: TimeSlotProps): TimeSlot {
    if (props.start.trim().length === 0 || props.end.trim().length === 0) {
      throw new Error("TimeSlot requires start and end");
    }
    return new TimeSlot({
      day: props.day.trim(),
      start: props.start.trim(),
      end: props.end.trim(),
    });
  }

  get day(): string {
    return this.props.day;
  }

  get start(): string {
    return this.props.start;
  }

  get end(): string {
    return this.props.end;
  }

  get range(): string {
    return `${this.props.start} – ${this.props.end}`;
  }
}
