import { Component, input } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';

import { BUS_LINE_PATH } from '../../../app.routes.constants';

@Component({
  selector: 'app-bus-stop-item',
  imports: [RouterLink, NgTemplateOutlet],
  templateUrl: './bus-stop-item.component.html',
  styleUrl: './bus-stop-item.component.scss'
})
export class BusStopItemComponent {
  readonly busLineNumber = input.required<number>();
  readonly busStopId = input.required<string>();
  readonly busStopName = input.required<string>();
  readonly busStopTown = input.required<string>();
  readonly isSkipped = input.required<boolean>();

  protected readonly busLinePath = BUS_LINE_PATH;
}
