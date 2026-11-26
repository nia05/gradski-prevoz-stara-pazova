import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { getBusLineLink } from '../../../app.routes.links';
import { IconPath } from '../../../shared/icon-path.model';

@Component({
  selector: 'app-bus-line-item',
  imports: [RouterLink],
  templateUrl: './bus-line-item.component.html',
  styleUrl: './bus-line-item.component.scss'
})
export class BusLineItemComponent {
  readonly busLineNumber = input.required<number>();
  readonly busLineName = input.required<string>();

  protected readonly iconPath = IconPath;
  protected readonly busLineLink = computed(() => getBusLineLink(this.busLineNumber()));
}
