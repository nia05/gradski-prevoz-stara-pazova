import { Component, computed, inject, input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

import { GOOGLE_MY_MAPS_EMBED_URL } from '../../../core/bus-lines/bus-lines.constants';

@Component({
  selector: 'app-bus-line-map',
  imports: [],
  templateUrl: './bus-line-map.component.html',
  styleUrl: './bus-line-map.component.scss'
})
export class BusLineMapComponent {
  private readonly sanitizer = inject(DomSanitizer);

  readonly mapId = input.required<string>();
  readonly busLinePageName = input.required<string>();

  protected readonly mapUrl = computed(
    () => this.sanitizer.bypassSecurityTrustResourceUrl(GOOGLE_MY_MAPS_EMBED_URL + this.mapId())
  );
}
