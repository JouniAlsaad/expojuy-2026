import type { TicketType } from "./ticket-type.entity";

export interface TicketRepository {
  findAll(): Promise<TicketType[]>;
}
