import { Component } from '@angular/core';
import { SearchBusStopSectionComponent } from './components/search-bus-stop-section/search-bus-stop-section.component';

@Component({
  selector: 'app-landing',
  imports: [SearchBusStopSectionComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

}
