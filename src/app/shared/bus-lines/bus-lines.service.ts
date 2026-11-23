import { computed, inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';

import { BusLinesResponse, BusStop, Line } from './bus-lines.model';
import { BUS_LINES_URL, EMPTY_BUS_LINES_RESPONSE } from './bus-lines.constants';
import { toLowercaseWithoutDiacritics } from '../utils';

@Injectable({ providedIn: 'root' })
export class BusLinesService {
  private readonly http = inject(HttpClient);

  private readonly data = toSignal(
    this.http.get<BusLinesResponse>(BUS_LINES_URL),
    { initialValue: EMPTY_BUS_LINES_RESPONSE }
  );

  readonly lines = computed(() => this.data().lines);

  private readonly uniqueBusStops = computed(() => {
    const allDirections = this.lines().flatMap(line => line.directions);
    const allBusStops = allDirections.flatMap(direction => direction.busStops);
    return allBusStops.filter((busStop, index) => allBusStops.findIndex(otherBusStop => otherBusStop.id === busStop.id) === index);
  });

  getLine(number: number): Line | undefined {
    return this.lines().find(line => line.number === number);
  }

  searchBusStops(searchTerm: string): BusStop[] {
    const term = toLowercaseWithoutDiacritics(searchTerm);
    if (!term) {
      return [];
    }
    return this.uniqueBusStops().filter(busStop => toLowercaseWithoutDiacritics(`${busStop.town} ${busStop.name}`).includes(term));
  }
}
