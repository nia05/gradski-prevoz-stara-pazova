import { Component, computed, input, output } from '@angular/core';

import { Line } from '../../../core/bus-lines/bus-lines.model';
import { BreadcrumbComponent } from '../../../shared/breadcrumb/breadcrumb.component';
import { BreadcrumbLink } from '../../../shared/breadcrumb/breadcrumb.model';
import { HOME_BREADCRUMB_LINK } from '../../../shared/breadcrumb/breadcrumb.constants';
import { getBusLineLink } from '../../../app.routes.links';
import { getBusLinePageName } from '../../../app.routes.page-names';
import { IconPath } from '../../../shared/icon-path.model';
import { BusStopWarningComponent } from '../bus-stop-warning/bus-stop-warning.component';

@Component({
  selector: 'app-line-header',
  imports: [BreadcrumbComponent, BusStopWarningComponent],
  templateUrl: './line-header.component.html',
  styleUrl: './line-header.component.scss'
})
export class LineHeaderComponent {
  readonly busLine = input.required<Line>();
  readonly isReturnDirection = input.required<boolean>();
  readonly skippedBusStopNames = input.required<string[]>();
  readonly routeChangeNewsId = input.required<number | null>();
  readonly isMapVisible = input.required<boolean>();
  readonly directionChange = output<void>();
  readonly mapVisibilityChange = output<void>();

  protected readonly iconPath = IconPath;

  protected readonly busLinePageName = computed(() => getBusLinePageName(this.busLine().number));

  protected readonly breadcrumbLinks = computed<BreadcrumbLink[]>(() => [
    HOME_BREADCRUMB_LINK,
    { name: this.busLinePageName(), link: getBusLineLink(this.busLine().number) },
  ]);

  protected readonly firstDirectionBusStops = computed(() => this.busLine().directions[0].busStops);

  protected readonly hasMap = computed(() => {
    const directions = this.busLine().directions;
    const shownDirection = this.isReturnDirection() ? directions[1] : directions[0];
    return shownDirection.mapId !== null;
  });

  protected readonly towns = computed(() => {
    const allTowns = this.firstDirectionBusStops().map(busStop => busStop.town);
    return [...new Set(allTowns)].join(', ');
  });

  protected readonly changeDirectionLabel = computed(() => {
    const directions = this.busLine().directions;
    const otherDirection = this.isReturnDirection() ? directions[0] : directions[1];
    const lastBusStop = otherDirection.busStops[otherDirection.busStops.length - 1];
    return `Promeni smer ka ${lastBusStop.name}`;
  });

  protected readonly mapButtonLabel = computed(
    () => this.isMapVisible() ? 'Pogledaj listu stajališta' : 'Pogledaj liniju na mapi'
  );

  protected readonly mapButtonIconPath = computed(
    () => this.isMapVisible() ? IconPath.List : IconPath.Map
  );
}
