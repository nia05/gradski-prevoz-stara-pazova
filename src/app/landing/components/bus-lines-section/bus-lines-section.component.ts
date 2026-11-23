import { Component, computed, inject } from '@angular/core';

import { BusLineItemComponent } from '../bus-line-item/bus-line-item.component';
import { BusLinesService } from '../../../core/bus-lines/bus-lines.service';
import { BusLineType } from '../../../core/bus-lines/bus-lines.model';

@Component({
  selector: 'app-bus-lines-section',
  imports: [BusLineItemComponent],
  templateUrl: './bus-lines-section.component.html',
  styleUrl: './bus-lines-section.component.scss'
})
export class BusLinesSectionComponent {
  private readonly busLines = inject(BusLinesService);

  protected readonly urbanBusLines = computed(
    () => this.busLines.lines().filter(busLine => busLine.type === BusLineType.Urban)
  );

  protected readonly suburbanBusLines = computed(
    () => this.busLines.lines().filter(busLine => busLine.type === BusLineType.Suburban)
  );
}
