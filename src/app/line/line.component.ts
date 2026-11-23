import { Component, computed, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { BusLinesService } from '../core/bus-lines/bus-lines.service';
import { BusLineType, BusStop } from '../core/bus-lines/bus-lines.model';
import { BusStopItemComponent } from '../shared/bus-stop-item/bus-stop-item.component';
import { HOME_PATH } from '../app.routes.constants';

@Component({
  selector: 'app-line',
  imports: [RouterLink, BusStopItemComponent],
  templateUrl: './line.component.html',
  styleUrl: './line.component.scss'
})
export class LineComponent {
  private readonly busLines = inject(BusLinesService);

  readonly busLineNumber = input.required<string>();

  protected readonly homePath = HOME_PATH;
  protected readonly busLineType = BusLineType;
  protected readonly isReturnDirection = signal(false);

  protected readonly busLine = computed(
    () => this.busLines.lines().find(busLine => busLine.number === Number(this.busLineNumber()))
  );

  protected getTowns(busStops: BusStop[]): string {
    const allTowns = busStops.map(busStop => busStop.town);
    return [...new Set(allTowns)].join(', ');
  }

  protected changeDirection(): void {
    this.isReturnDirection.update(isReturnDirection => !isReturnDirection);
  }
}
