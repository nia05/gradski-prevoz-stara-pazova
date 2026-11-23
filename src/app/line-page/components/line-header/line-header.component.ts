import { Component, computed, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Line } from '../../../core/bus-lines/bus-lines.model';
import { HOME_PATH } from '../../../app.routes.constants';

@Component({
  selector: 'app-line-header',
  imports: [RouterLink],
  templateUrl: './line-header.component.html',
  styleUrl: './line-header.component.scss'
})
export class LineHeaderComponent {
  readonly busLine = input.required<Line>();
  readonly isReturnDirection = input.required<boolean>();
  readonly directionChange = output<void>();

  protected readonly homePath = HOME_PATH;

  protected readonly firstDirectionBusStops = computed(() => this.busLine().directions[0].busStops);

  protected readonly towns = computed(() => {
    const allTowns = this.firstDirectionBusStops().map(busStop => busStop.town);
    return [...new Set(allTowns)].join(', ');
  });
}
