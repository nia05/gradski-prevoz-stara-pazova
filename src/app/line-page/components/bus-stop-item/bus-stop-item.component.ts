import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { getBusStopLink } from '../../../app.routes.links';
import { IconPath } from '../../../shared/icon-path.model';

@Component({
  selector: 'app-bus-stop-item',
  imports: [RouterLink],
  templateUrl: './bus-stop-item.component.html',
  styleUrl: './bus-stop-item.component.scss'
})
export class BusStopItemComponent {
  readonly busLineNumber = input.required<number>();
  readonly busStopId = input.required<string>();
  readonly busStopName = input.required<string>();
  readonly busStopTown = input.required<string>();
  readonly isSkipped = input.required<boolean>();

  protected readonly iconPath = IconPath;
  protected readonly busStopLink = computed(() => getBusStopLink(this.busLineNumber(), this.busStopId()));
}
