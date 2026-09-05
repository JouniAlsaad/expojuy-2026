export const AGENDA_TRACKS = [
  "institucional",
  "mineria-energia",
  "agroindustria",
  "turismo",
  "tecnologia",
  "artesanias",
  "gastronomia",
  "negocios",
] as const;

export type AgendaTrackSlug = (typeof AGENDA_TRACKS)[number];

function isTrackSlug(value: string): value is AgendaTrackSlug {
  return (AGENDA_TRACKS as readonly string[]).includes(value);
}

export class AgendaTrack {
  private constructor(private readonly slug: AgendaTrackSlug) {}

  static create(value: string): AgendaTrack {
    if (!isTrackSlug(value)) {
      throw new Error(`Unknown agenda track: ${value}`);
    }
    return new AgendaTrack(value);
  }

  get value(): AgendaTrackSlug {
    return this.slug;
  }

  equals(other: AgendaTrack): boolean {
    return this.slug === other.slug;
  }
}
