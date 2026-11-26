import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { getNewsLink } from '../../../app.routes.links';
import { IconPath } from '../../../shared/icon-path.model';

@Component({
  selector: 'app-bus-stop-warning',
  imports: [RouterLink],
  templateUrl: './bus-stop-warning.component.html',
  styleUrl: './bus-stop-warning.component.scss'
})
export class BusStopWarningComponent {
  readonly skippedBusStopNames = input.required<string[]>();
  readonly routeChangeNewsId = input.required<number | null>();

  protected readonly iconPath = IconPath;

  protected readonly busStopWord = computed(
    () => this.skippedBusStopNames().length === 1 ? 'stajalištu' : 'stajalištima'
  );

  protected readonly newsLink = computed(() => {
    const routeChangeNewsId = this.routeChangeNewsId();
    if (routeChangeNewsId === null) {
      return null;
    }
    return getNewsLink(routeChangeNewsId);
  });
}
