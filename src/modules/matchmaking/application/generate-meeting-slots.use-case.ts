import type { DayOption, MeetingSlotDto } from "./meeting.dto";

const SLOT_TIMES = ["10:00", "12:30", "16:00"] as const;

export class GenerateMeetingSlotsUseCase {
  execute(days: DayOption[]): MeetingSlotDto[] {
    return days.flatMap((day) =>
      SLOT_TIMES.map((time) => ({
        id: `${day.day}-${time}`,
        label: `${day.dayLabel} · ${time}`,
      })),
    );
  }
}
