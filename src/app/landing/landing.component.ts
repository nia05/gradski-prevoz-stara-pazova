import { Component } from '@angular/core';

import { SearchBusStopSectionComponent } from './components/search-bus-stop-section/search-bus-stop-section.component';
import { BusLinesSectionComponent } from './components/bus-lines-section/bus-lines-section.component';
import { NewsSectionComponent } from './components/news-section/news-section.component';

@Component({
  selector: 'app-landing',
  imports: [
    SearchBusStopSectionComponent, 
    BusLinesSectionComponent, 
    NewsSectionComponent
  ],
  templateUrl: './landing.component.html'
})
export class LandingComponent {}
