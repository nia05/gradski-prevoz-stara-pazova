import { Component, computed, input, output } from '@angular/core';

import { Line } from '../../../core/bus-lines/bus-lines.model';
import { BreadcrumbComponent } from '../../../shared/breadcrumb/breadcrumb.component';
import { BreadcrumbLink } from '../../../shared/breadcrumb/breadcrumb.model';
import { HOME_BREADCRUMB_LINK } from '../../../shared/breadcrumb/breadcrumb.constants';
import { BUS_LINE_PATH } from '../../../app.routes.constants';
import { BusStopWarningComponent } from '../bus-stop-warning/bus-stop-warning.component';

@Component({
  selector: 'app-line-header',
  imports: [BreadcrumbComponent, BusStopWarningComponent],
  templateUrl: './line-header.component.html'
})
export class LineHeaderComponent {
  readonly busLine = input.required<Line>();
  readonly isReturnDirection = input.required<boolean>();
  readonly skippedBusStopNames = input.required<string[]>();
  readonly routeChangeNewsId = input.required<number | null>();
  readonly directionChange = output<void>();

  protected readonly breadcrumbLinks = computed<BreadcrumbLink[]>(() => [
    HOME_BREADCRUMB_LINK,
    { name: `Linija ${this.busLine().number}`, link: ['/', BUS_LINE_PATH, this.busLine().number] },
  ]);

  protected readonly firstDirectionBusStops = computed(() => this.busLine().directions[0].busStops);

  protected readonly towns = computed(() => {
    const allTowns = this.firstDirectionBusStops().map(busStop => busStop.town);
    return [...new Set(allTowns)].join(', ');
  });

  protected readonly changeDirectionLabel = computed(() => {
    const directions = this.busLine().directions;
    const otherDirection = this.isReturnDirection() ? directions[0] : directions[1];
    const lastBusStop = otherDirection.busStops[otherDirection.busStops.length - 1];
    return `Promeni smer ka ${lastBusStop.name}`;
  });
}
