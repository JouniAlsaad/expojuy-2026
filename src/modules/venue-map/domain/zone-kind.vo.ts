export const ZONE_KINDS = ["pabellon", "servicio", "auditorio", "acceso"] as const;

export type ZoneKindSlug = (typeof ZONE_KINDS)[number];

function isZoneKind(value: string): value is ZoneKindSlug {
  return (ZONE_KINDS as readonly string[]).includes(value);
}

export class ZoneKind {
  private constructor(private readonly slug: ZoneKindSlug) {}

  static create(value: string): ZoneKind {
    if (!isZoneKind(value)) {
      throw new Error(`Unknown zone kind: ${value}`);
    }
    return new ZoneKind(value);
  }

  get value(): ZoneKindSlug {
    return this.slug;
  }
}
