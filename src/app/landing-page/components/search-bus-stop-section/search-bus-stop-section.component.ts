import { Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';
import { Router } from '@angular/router';

import { BusStop } from '../../../core/bus-lines/bus-lines.model';
import { BusLinesService } from '../../../core/bus-lines/bus-lines.service';
import { splitAroundMatch } from '../../../shared/utils';
import { TextAroundMatch } from '../../../shared/utils.model';
import { getBusStopLink } from '../../../app.routes.links';
import { IconPath } from '../../../shared/icon-path.model';

@Component({
  selector: 'app-search-bus-stop-section',
  imports: [],
  templateUrl: './search-bus-stop-section.component.html',
  styleUrl: './search-bus-stop-section.component.scss'
})
export class SearchBusStopSectionComponent {
  private readonly busLines = inject(BusLinesService);
  private readonly router = inject(Router);
  private readonly searchInput = viewChild.required<ElementRef<HTMLInputElement>>('searchInput');

  protected readonly iconPath = IconPath;
  protected readonly searchTerm = signal('');
  protected readonly selectedBusStop = signal<BusStop | null>(null);

  protected readonly matchingBusStops = computed(() => this.busLines.searchBusStops(this.searchTerm()));
  protected readonly isDropdownOpen = computed(() => this.searchTerm() !== '' && !this.selectedBusStop());

  protected updateSearchTerm(value: string): void {
    this.searchTerm.set(value);
    this.selectedBusStop.set(null);
  }

  protected selectBusStop(busStop: BusStop): void {
    this.searchTerm.set(busStop.name);
    this.selectedBusStop.set(busStop);
  }

  protected clearSearch(): void {
    this.updateSearchTerm('');
    this.searchInput().nativeElement.focus();
  }

  protected highlightSearchTerm(text: string): TextAroundMatch {
    return splitAroundMatch(text, this.searchTerm());
  }

  protected openTimetable(): void {
    const busStop = this.selectedBusStop();
    if (!busStop) {
      return;
    }
    const busLine = this.busLines.findBusLineWithBusStop(busStop.id);
    if (!busLine) {
      return;
    }
    this.router.navigate(getBusStopLink(busLine.number, busStop.id));
  }
}
