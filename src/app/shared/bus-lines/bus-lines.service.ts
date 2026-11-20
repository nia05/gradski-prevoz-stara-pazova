import { computed, inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';

import { BusLinesResponse, Line } from './bus-lines.model';

@Injectable({ providedIn: 'root' })
export class BusLinesService {
  private readonly http = inject(HttpClient);

  private readonly data = toSignal(this.http.get<BusLinesResponse>('data/lines.json'));

  readonly loaded = computed(() => this.data() !== undefined);

  readonly lines = computed(() => this.data()?.lines ?? []);

  getLine(number: number): Line | undefined {
    return this.lines().find(line => line.number === number);
  }
}
