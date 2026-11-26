import { Component, computed, inject, input, linkedSignal, signal } from '@angular/core';

import { BusLinesService } from '../core/bus-lines/bus-lines.service';
import { BusStop, Direction } from '../core/bus-lines/bus-lines.model';
import { getTimeOfDay, getTimetableDay } from '../shared/utils';
import { BusStopHeaderComponent } from './components/bus-stop-header/bus-stop-header.component';
import { DepartureScheduleComponent } from './components/departure-schedule/departure-schedule.component';

@Component({
  selector: 'app-bus-stop-page',
  imports: [BusStopHeaderComponent, DepartureScheduleComponent],
  templateUrl: './bus-stop-page.component.html',
  styleUrl: './bus-stop-page.component.scss'
})
export class BusStopPageComponent {
  private readonly busLines = inject(BusLinesService);

  readonly busLineNumber = input.required<string>();
  readonly busStopId = input.required<string>();

  private readonly todayTimetableDay = getTimetableDay(new Date());
  private readonly currentTime = getTimeOfDay(new Date());

  protected readonly selectedDay = signal(this.todayTimetableDay);

  protected readonly busLine = computed(
    () => this.busLines.lines().find(busLine => busLine.number === Number(this.busLineNumber()))
  );

  protected readonly isReturnDirection = linkedSignal(() => {
    const busLine = this.busLine();
    if (!busLine) {
      return false;
    }
    return !busLine.directions[0].busStops.some(busStop => busStop.id === this.busStopId());
  });

  protected readonly currentTimeForSelectedDay = computed(
    () => this.selectedDay() === this.todayTimetableDay ? this.currentTime : null
  );

  protected getBusStop(direction: Direction): BusStop | undefined {
    return direction.busStops.find(busStop => busStop.id === this.busStopId());
  }

  protected getDepartureTimes(direction: Direction): string[] {
    const busStopIndex = direction.busStops.findIndex(busStop => busStop.id === this.busStopId());
    const times = direction.timetable[this.selectedDay()].map(departure => departure.times[busStopIndex]);
    return times.filter(time => time !== null).sort();
  }

  protected changeDirection(): void {
    this.isReturnDirection.update(isReturnDirection => !isReturnDirection);
  }
}
