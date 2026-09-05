export interface EventInfoDto {
  edition: number;
  startDate: string;
  endDate: string;
  datesLabel: string;
  venue: string;
  city: string;
  stats: {
    stands: number;
    surfaceM2: number;
    visitors: number;
    editions: number;
  };
}
