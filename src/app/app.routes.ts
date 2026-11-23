import { Routes } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { LinePageComponent } from './line-page/line-page.component';
import { BusStopComponent } from './bus-stop/bus-stop.component';
import { APP_TITLE, BUS_LINE_PATH, HOME_PATH, UNKNOWN_PATH } from './app.routes.constants';

export const routes: Routes = [
  { path: HOME_PATH, component: LandingComponent, title: APP_TITLE },
  { path: `${BUS_LINE_PATH}/:busLineNumber`, component: LinePageComponent },
  { path: `${BUS_LINE_PATH}/:busLineNumber/:busStopId`, component: BusStopComponent },
  { path: UNKNOWN_PATH, redirectTo: HOME_PATH },
];
