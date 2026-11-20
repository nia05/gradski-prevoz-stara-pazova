import { Routes } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { LineComponent } from './line/line.component';
import { BusStopComponent } from './bus-stop/bus-stop.component';

// URLs:
//   /                                         → landing
//   /linija/1                                 → line 1
//   /linija/1/stara-pazova-stara-pazova-as    → bus stop on line 1 (stop "id" from linije.json)
export const routes: Routes = [
  { path: '', component: LandingComponent, title: 'Gradski prevoz Stara Pazova' },
  { path: 'linija/:broj', component: LineComponent },
  { path: 'linija/:broj/:stanicaId', component: BusStopComponent },
  { path: '**', redirectTo: '' },
];
