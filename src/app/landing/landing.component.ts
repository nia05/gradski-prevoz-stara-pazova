import { Component, computed, inject } from '@angular/core';

import { SearchBusStopSectionComponent } from './components/search-bus-stop-section/search-bus-stop-section.component';
import { BusLineItemComponent } from '../shared/bus-line-item/bus-line-item.component';
import { BusLinesService } from '../shared/bus-lines/bus-lines.service';
import { BusLineType } from '../shared/bus-lines/bus-lines.model';

@Component({
  selector: 'app-landing',
  imports: [SearchBusStopSectionComponent, BusLineItemComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  private readonly busLines = inject(BusLinesService);

  protected readonly urbanBusLines = computed(
    () => this.busLines.lines().filter(busLine => busLine.type === BusLineType.Urban)
  );
  
  protected readonly suburbanBusLines = computed(
    () => this.busLines.lines().filter(busLine => busLine.type === BusLineType.Suburban)
  );
}
