import { Component, input } from '@angular/core';

@Component({
  selector: 'app-bus-stop',
  imports: [],
  templateUrl: './bus-stop.component.html',
  styleUrl: './bus-stop.component.scss'
})
export class BusStopComponent {
  readonly busLineNumber = input.required<string>();
  readonly busStopId = input.required<string>();
}
