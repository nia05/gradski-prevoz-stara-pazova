import { Component, input } from '@angular/core';

@Component({
  selector: 'app-bus-stop',
  imports: [],
  templateUrl: './bus-stop.component.html',
  styleUrl: './bus-stop.component.scss'
})
export class BusStopComponent {
  /** From the URL: /linija/:broj/:stanicaId */
  broj = input.required<string>();
  stanicaId = input.required<string>();
}
