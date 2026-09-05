import type { AgendaTrack } from "./agenda-track.vo";
import type { TimeSlot } from "./time-slot.vo";

export interface SessionProps {
  id: string;
  title: string;
  speaker: string;
  stage: string;
  track: AgendaTrack;
  slot: TimeSlot;
}

export class Session {
  private constructor(private readonly props: SessionProps) {}

  static create(props: SessionProps): Session {
    return new Session(props);
  }

  get id(): string {
    return this.props.id;
  }

  get title(): string {
    return this.props.title;
  }

  get speaker(): string {
    return this.props.speaker;
  }

  get stage(): string {
    return this.props.stage;
  }

  get track(): AgendaTrack {
    return this.props.track;
  }

  get slot(): TimeSlot {
    return this.props.slot;
  }
}
