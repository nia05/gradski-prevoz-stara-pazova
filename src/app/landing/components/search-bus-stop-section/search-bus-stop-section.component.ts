import { Component, ElementRef, signal, viewChild } from '@angular/core';

@Component({
  selector: 'app-search-bus-stop-section',
  imports: [],
  templateUrl: './search-bus-stop-section.component.html',
  styleUrl: './search-bus-stop-section.component.scss'
})
export class SearchBusStopSectionComponent {
  private readonly searchInput = viewChild.required<ElementRef<HTMLInputElement>>('searchInput');

  /** Tekst upisan u polje za pretragu stajališta */
  protected readonly searchTerm = signal('');

  protected updateSearchTerm(value: string): void {
    this.searchTerm.set(value);
  }

  /** Briše unos i vraća fokus u polje */
  protected clearSearch(): void {
    this.searchTerm.set('');
    this.searchInput().nativeElement.focus();
  }
}
