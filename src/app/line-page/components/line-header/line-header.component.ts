import { Component, computed, input, output } from '@angular/core';

import { Line } from '../../../core/bus-lines/bus-lines.model';
import { BreadcrumbComponent } from '../../../shared/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-line-header',
  imports: [BreadcrumbComponent],
  templateUrl: './line-header.component.html',
  styleUrl: './line-header.component.scss'
})
export class LineHeaderComponent {
  readonly busLine = input.required<Line>();
  readonly isReturnDirection = input.required<boolean>();
  readonly directionChange = output<void>();

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
