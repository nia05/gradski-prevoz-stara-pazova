import { Component, input } from '@angular/core';

@Component({
  selector: 'app-bus-stop-page',
  imports: [],
  templateUrl: './bus-stop-page.component.html',
  styleUrl: './bus-stop-page.component.scss'
})
export class BusStopPageComponent {
  readonly busLineNumber = input.required<string>();
  readonly busStopId = input.required<string>();
}
