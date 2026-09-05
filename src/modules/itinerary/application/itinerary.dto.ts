export interface RoutePreferences {
  interests: string[];
  maxMinutes: number;
  day: string;
}

export type ItineraryStopKind = "session" | "stand";

export interface ItineraryStopDto {
  kind: ItineraryStopKind;
  time: string | null;
  title: string;
  subtitle: string;
  category: string | null;
}

export interface ItineraryDto {
  day: string;
  stops: ItineraryStopDto[];
  estimatedMinutes: number;
}
