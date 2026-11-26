import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NEWS_PATH } from '../../../app.routes.constants';

@Component({
  selector: 'app-bus-stop-warning',
  imports: [RouterLink],
  templateUrl: './bus-stop-warning.component.html',
  styleUrl: './bus-stop-warning.component.scss'
})
export class BusStopWarningComponent {
  readonly skippedBusStopNames = input.required<string[]>();
  readonly routeChangeNewsId = input.required<number | null>();

  protected readonly newsPath = NEWS_PATH;

  protected readonly busStopWord = computed(
    () => this.skippedBusStopNames().length === 1 ? 'stajalištu' : 'stajalištima'
  );
}
