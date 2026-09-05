import ticketsData from "@/data/tickets.json";
import type { TicketRepository } from "@/modules/tickets/domain";
import { TicketType } from "@/modules/tickets/domain";
import { type TicketRecord, ticketDatasetSchema } from "./ticket.schema";

function toEntity(record: TicketRecord): TicketType {
  return TicketType.create({
    id: record.id,
    slug: record.slug,
    name: record.name,
    price: record.price,
    perks: record.perks,
    highlighted: record.highlighted,
  });
}

export class JsonTicketRepository implements TicketRepository {
  private readonly tickets: TicketType[];

  constructor() {
    const dataset = ticketDatasetSchema.parse(ticketsData);
    this.tickets = dataset.items.map(toEntity);
  }

  async findAll(): Promise<TicketType[]> {
    return this.tickets;
  }
}

export function createTicketRepository(): TicketRepository {
  return new JsonTicketRepository();
}
