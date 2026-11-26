import { Component, computed, inject, input, signal } from '@angular/core';

import { BusLinesService } from '../core/bus-lines/bus-lines.service';
import { LineHeaderComponent } from './components/line-header/line-header.component';
import { BusStopListComponent } from './components/bus-stop-list/bus-stop-list.component';

@Component({
  selector: 'app-line-page',
  imports: [LineHeaderComponent, BusStopListComponent],
  templateUrl: './line-page.component.html',
  styleUrl: './line-page.component.scss'
})
export class LinePageComponent {
  private readonly busLines = inject(BusLinesService);

  readonly busLineNumber = input.required<string>();

  protected readonly isReturnDirection = signal(false);

  protected readonly busLine = computed(
    () => this.busLines.lines().find(busLine => busLine.number === Number(this.busLineNumber()))
  );

  protected changeDirection(): void {
    this.isReturnDirection.update(isReturnDirection => !isReturnDirection);
  }
}
