import { Component } from '@angular/core';

import { SearchBusStopSectionComponent } from './components/search-bus-stop-section/search-bus-stop-section.component';
import { BusLinesSectionComponent } from './components/bus-lines-section/bus-lines-section.component';

@Component({
  selector: 'app-landing',
  imports: [SearchBusStopSectionComponent, BusLinesSectionComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {}
