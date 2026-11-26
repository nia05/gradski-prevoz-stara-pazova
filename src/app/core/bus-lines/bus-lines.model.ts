export enum BusLineType {
  Urban = 'urban',
  Suburban = 'suburban',
}

export enum DirectionCode {
  A = 'A',
  B = 'B',
}

export enum TimetableDay {
  Weekday = 'weekday',
  Saturday = 'saturday',
  Sunday = 'sunday',
}

export interface BusLinesResponse {
  lines: Line[];
}

export interface Line {
  number: number;
  name: string;
  type: BusLineType;
  validFrom: string;
  registerNumber: number;
  directions: Direction[];
}

export interface Direction {
  code: DirectionCode;
  from: string;
  to: string;
  skippedBusStopIds: string[];
  routeChangeNewsId: number | null;
  busStops: BusStop[];
  timetable: Timetable;
  note?: string;
}

export interface BusStop {
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

export interface Departure {
  number: number;
  times: (string | null)[];
}
