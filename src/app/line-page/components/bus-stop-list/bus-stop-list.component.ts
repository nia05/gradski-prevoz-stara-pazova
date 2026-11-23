import { Component, input } from '@angular/core';

import { BusStop } from '../../../core/bus-lines/bus-lines.model';
import { BusStopItemComponent } from '../bus-stop-item/bus-stop-item.component';

@Component({
  selector: 'app-bus-stop-list',
  imports: [BusStopItemComponent],
  templateUrl: './bus-stop-list.component.html',
  styleUrl: './bus-stop-list.component.scss'
})
export class BusStopListComponent {
  readonly busLineNumber = input.required<number>();
  readonly busStops = input.required<BusStop[]>();
  readonly isTownVisible = input.required<boolean>();
}
