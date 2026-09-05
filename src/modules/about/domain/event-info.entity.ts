export interface EventStats {
  stands: number;
  surfaceM2: number;
  visitors: number;
  editions: number;
}

export interface EventInfoProps {
  edition: number;
  startDate: string;
  endDate: string;
  venue: string;
  city: string;
  stats: EventStats;
}

export class EventInfo {
  private constructor(private readonly props: EventInfoProps) {}

  static create(props: EventInfoProps): EventInfo {
    return new EventInfo(props);
  }

  get edition(): number {
    return this.props.edition;
  }

  get startDate(): string {
    return this.props.startDate;
  }

  get endDate(): string {
    return this.props.endDate;
  }

  get venue(): string {
    return this.props.venue;
  }

  get city(): string {
    return this.props.city;
  }

  get stats(): EventStats {
    return this.props.stats;
  }
}
