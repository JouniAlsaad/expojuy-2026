import type { TicketRepository } from "@/modules/tickets/domain";
import type { TicketTypeDto } from "./ticket.dto";
import { toTicketTypeDto } from "./ticket.mapper";

export class GetTicketTypesUseCase {
  constructor(private readonly repository: TicketRepository) {}

  async execute(): Promise<TicketTypeDto[]> {
    const tickets = await this.repository.findAll();
    return tickets.map(toTicketTypeDto);
  }
}
