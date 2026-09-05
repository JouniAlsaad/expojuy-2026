import { z } from "zod";
import { AGENDA_TRACKS } from "@/modules/agenda/domain";

export const sessionRecordSchema = z.object({
  id: z.string().min(1),
  day: z.string().min(1),
  startTime: z.string().min(1),
  endTime: z.string().min(1),
  title: z.string().min(1),
  speaker: z.string().min(1),
  stage: z.string().min(1),
  track: z.enum(AGENDA_TRACKS),
});

export type SessionRecord = z.infer<typeof sessionRecordSchema>;

export const agendaDatasetSchema = z.object({
  _mock: z.literal(true),
  _disclaimer: z.string(),
  items: z.array(sessionRecordSchema),
});
