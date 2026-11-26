import { Component, computed, input, output } from '@angular/core';

import { BusStop, Line, TimetableDay } from '../../../core/bus-lines/bus-lines.model';
import { BreadcrumbComponent } from '../../../shared/breadcrumb/breadcrumb.component';
import { BreadcrumbLink } from '../../../shared/breadcrumb/breadcrumb.model';
import { BUS_LINE_PATH } from '../../../app.routes.constants';
import { DAY_TABS } from './bus-stop-header.constants';

@Component({
  selector: 'app-bus-stop-header',
  imports: [BreadcrumbComponent],
  templateUrl: './bus-stop-header.component.html',
  styleUrl: './bus-stop-header.component.scss'
})
export class BusStopHeaderComponent {
  readonly busLine = input.required<Line>();
  readonly busStop = input.required<BusStop>();
  readonly isReturnDirection = input.required<boolean>();
  readonly selectedDay = input.required<TimetableDay>();
  readonly directionChange = output<void>();
  readonly dayChange = output<TimetableDay>();

  protected readonly dayTabs = DAY_TABS;

  protected readonly firstDirectionBusStops = computed(() => this.busLine().directions[0].busStops);

  protected readonly breadcrumbParentPages = computed<BreadcrumbLink[]>(() => [
    { label: `Linija ${this.busLine().number}`, path: ['/', BUS_LINE_PATH, this.busLine().number] },
  ]);

  private readonly otherDirection = computed(() => {
    const directions = this.busLine().directions;
    return this.isReturnDirection() ? directions[0] : directions[1];
  });

  protected readonly canChangeDirection = computed(() => {
    const otherDirection = this.otherDirection();
    if (!otherDirection) {
      return false;
    }
    return otherDirection.busStops.some(busStop => busStop.id === this.busStop().id);
  });

  protected readonly changeDirectionLabel = computed(() => {
    const otherDirectionBusStops = this.otherDirection().busStops;
    const lastBusStop = otherDirectionBusStops[otherDirectionBusStops.length - 1];
    return `Promeni smer ka ${lastBusStop.name}`;
  });
}
