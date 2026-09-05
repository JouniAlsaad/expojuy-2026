import type { TicketType } from "@/modules/tickets/domain";
import type { TicketTypeDto } from "./ticket.dto";

const priceFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  maximumFractionDigits: 0,
});

export function toTicketTypeDto(ticket: TicketType): TicketTypeDto {
  return {
    id: ticket.id,
    slug: ticket.slug,
    name: ticket.name,
    price: ticket.price,
    priceLabel: priceFormatter.format(ticket.price),
    isFree: ticket.isFree,
    perks: ticket.perks,
    highlighted: ticket.isHighlighted,
  };
}
