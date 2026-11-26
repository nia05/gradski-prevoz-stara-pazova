import { Component, computed, input } from '@angular/core';

import { DepartureHourRow } from './departure-schedule.model';

@Component({
  selector: 'app-departure-schedule',
  imports: [],
  templateUrl: './departure-schedule.component.html',
  styleUrl: './departure-schedule.component.scss'
})
export class DepartureScheduleComponent {
  readonly departureTimes = input.required<string[]>();
  readonly currentTime = input.required<string | null>();

  protected readonly hourRowColumns = computed(() => {
    const hourRows: DepartureHourRow[] = [];
    for (const time of this.departureTimes()) {
      const hour = time.slice(0, 2);
      const lastHourRow = hourRows[hourRows.length - 1];
      if (lastHourRow && lastHourRow.hour === hour) {
        lastHourRow.times.push(time);
      } else {
        hourRows.push({ hour, times: [time] });
      }
    }
    const middleIndex = Math.ceil(hourRows.length / 2);
    return [hourRows.slice(0, middleIndex), hourRows.slice(middleIndex)];
  });

  protected readonly nextDepartureTime = computed(() => {
    const currentTime = this.currentTime();
    if (currentTime === null) {
      return null;
    }
    return this.departureTimes().find(time => time >= currentTime);
  });

  protected isPast(time: string): boolean {
    const currentTime = this.currentTime();
    return currentTime !== null && time < currentTime;
  }
}
