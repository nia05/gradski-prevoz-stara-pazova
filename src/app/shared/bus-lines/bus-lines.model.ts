export interface BusLinesResponse {
  lines: Line[];
}

export interface Line {
  number: number;
  name: string;
  type: 'suburban' | 'urban';
  validFrom: string;
  registerNumber: number;
  directions: Direction[];
}

export interface Direction {
  /** A and B for two-way lines, K for circular lines */
  code: 'A' | 'B' | 'K';
  from: string;
  to: string;
  circular: boolean;
  stops: Stop[];
  timetable: Timetable;
  note?: string;
}

export interface Stop {
  id: string;
  town: string;
  name: string;
  km: number;
}

export interface Timetable {
  weekday: Departure[];
  saturday: Departure[];
  sunday: Departure[];
}

export type Day = keyof Timetable;

export interface Departure {
  number: number;
  /** "1" or "x1", as written on the PDF */
  vehicleCode: string;
  /** Aligned with the direction's `stops` array; null = this departure skips that stop */
  times: (string | null)[];
}
