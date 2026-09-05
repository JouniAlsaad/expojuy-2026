export const CONTACT_REASONS = ["expositor", "prensa", "sponsor", "general"] as const;

export type ContactReasonSlug = (typeof CONTACT_REASONS)[number];
