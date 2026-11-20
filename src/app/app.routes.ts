import { Routes } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { LineComponent } from './line/line.component';
import { BusStopComponent } from './bus-stop/bus-stop.component';

export const routes: Routes = [
  { path: '', component: LandingComponent, title: 'Gradski prevoz Stara Pazova' },
  { path: 'linija/:broj', component: LineComponent },
  { path: 'linija/:broj/:stanicaId', component: BusStopComponent },
  { path: '**', redirectTo: '' },
];
