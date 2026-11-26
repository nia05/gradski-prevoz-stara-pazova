import { BusLinesResponse, BusLineType, BusStop, Departure, Direction, DirectionCode, Line, Timetable } from './bus-lines.model';

export function createBusStop(busStop: Partial<BusStop> = {}): BusStop {
  return Object.assign(
    { id: 'stara-pazova-stara-pazova-as', town: 'Stara Pazova', name: 'Stara Pazova AS', km: 0 },
    busStop
  );
}

export function createDeparture(departure: Partial<Departure> = {}): Departure {
  return Object.assign(
    { number: 1, times: ['05:00'] },
    departure
  );
}

export function createTimetable(timetable: Partial<Timetable> = {}): Timetable {
  return Object.assign(
    { weekday: [], saturday: [], sunday: [] },
    timetable
  );
}

export function createDirection(direction: Partial<Direction> = {}): Direction {
  return Object.assign(
    {
      code: DirectionCode.A,
      from: 'Stara Pazova – Stara Pazova AS',
      to: 'Nova Pazova – Centar',
      skippedBusStopIds: [],
      routeChangeNewsId: null,
      busStops: [createBusStop()],
      timetable: createTimetable(),
    },
    direction
  );
}

export function createSuburbanBusLine(line: Partial<Line> = {}): Line {
  const novaPazovaCentar = createBusStop({ id: 'nova-pazova-centar', town: 'Nova Pazova', name: 'Centar', km: 7.07 });
  const cirilaIMetodija = createBusStop({ id: 'stara-pazova-cirila-i-metodija-1-d', town: 'Stara Pazova', name: 'Ćirila i Metodija 1 - d', km: 9.3 });

  return Object.assign(
    {
      number: 1,
      name: 'Stara Pazova – Nova Pazova (aerodrom)',
      type: BusLineType.Suburban,
      validFrom: '2026-10-05',
      registerNumber: 1,
      directions: [
        createDirection({ code: DirectionCode.A, busStops: [createBusStop(), novaPazovaCentar] }),
        createDirection({ code: DirectionCode.B, busStops: [novaPazovaCentar, cirilaIMetodija] }),
      ],
    },
    line
  );
}

export function createUrbanBusLine(line: Partial<Line> = {}): Line {
  return Object.assign(
    {
      number: 6,
      name: 'Gradska linija Stara Pazova',
      type: BusLineType.Urban,
      validFrom: '2026-10-05',
      registerNumber: 6,
      directions: [createDirection({ code: DirectionCode.B })],
    },
    line
  );
}

export function createBusLinesResponse(response: Partial<BusLinesResponse> = {}): BusLinesResponse {
  return Object.assign(
    { lines: [createSuburbanBusLine(), createUrbanBusLine()] }, 
    response
  );
}
