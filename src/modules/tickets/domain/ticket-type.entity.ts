export interface TicketTypeProps {
  id: string;
  slug: string;
  name: string;
  price: number;
  perks: string[];
  highlighted: boolean;
}

export class TicketType {
  private constructor(private readonly props: TicketTypeProps) {}

  static create(props: TicketTypeProps): TicketType {
    if (props.price < 0) {
      throw new Error("Ticket price cannot be negative");
    }
    return new TicketType(props);
  }

  get id(): string {
    return this.props.id;
  }

  get slug(): string {
    return this.props.slug;
  }

  get name(): string {
    return this.props.name;
  }

  get price(): number {
    return this.props.price;
  }

  get perks(): string[] {
    return this.props.perks;
  }

  get isHighlighted(): boolean {
    return this.props.highlighted;
  }

  get isFree(): boolean {
    return this.props.price === 0;
  }
}
