import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { BUS_LINE_PATH } from '../../../app.routes.constants';

@Component({
  selector: 'app-bus-line-item',
  imports: [RouterLink],
  templateUrl: './bus-line-item.component.html',
  styleUrl: './bus-line-item.component.scss'
})
export class BusLineItemComponent {
  readonly busLineNumber = input.required<number>();
  readonly busLineName = input.required<string>();

  protected readonly busLinePath = BUS_LINE_PATH;
}
