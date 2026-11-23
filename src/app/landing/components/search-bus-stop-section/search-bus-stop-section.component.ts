import { Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';

import { BusStop } from '../../../shared/bus-lines/bus-lines.model';
import { BusLinesService } from '../../../shared/bus-lines/bus-lines.service';
import { splitAroundMatch } from '../../../shared/utils';
import { TextAroundMatch } from '../../../shared/utils.model';

@Component({
  selector: 'app-search-bus-stop-section',
  imports: [],
  templateUrl: './search-bus-stop-section.component.html',
  styleUrl: './search-bus-stop-section.component.scss'
})
export class SearchBusStopSectionComponent {
  private readonly busLines = inject(BusLinesService);
  private readonly searchInput = viewChild.required<ElementRef<HTMLInputElement>>('searchInput');

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
}
