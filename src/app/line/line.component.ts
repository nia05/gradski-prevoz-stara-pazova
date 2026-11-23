import { Component, computed, inject, input, signal } from '@angular/core';

import { BusLinesService } from '../core/bus-lines/bus-lines.service';
import { BusLineType } from '../core/bus-lines/bus-lines.model';
import { LineHeaderComponent } from './components/line-header/line-header.component';
import { BusStopListComponent } from './components/bus-stop-list/bus-stop-list.component';

@Component({
  selector: 'app-line',
  imports: [LineHeaderComponent, BusStopListComponent],
  templateUrl: './line.component.html',
  styleUrl: './line.component.scss'
})
export class LineComponent {
  private readonly busLines = inject(BusLinesService);

  readonly busLineNumber = input.required<string>();

  protected readonly busLineType = BusLineType;
  protected readonly isReturnDirection = signal(false);

  protected readonly busLine = computed(
    () => this.busLines.lines().find(busLine => busLine.number === Number(this.busLineNumber()))
  );

  protected changeDirection(): void {
    this.isReturnDirection.update(isReturnDirection => !isReturnDirection);
  }
}
