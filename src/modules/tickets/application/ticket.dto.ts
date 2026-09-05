export interface TicketTypeDto {
  id: string;
  slug: string;
  name: string;
  price: number;
  priceLabel: string;
  isFree: boolean;
  perks: string[];
  highlighted: boolean;
}
