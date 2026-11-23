import { Routes } from '@angular/router';

import { LandingPageComponent } from './landing-page/landing-page.component';
import { LinePageComponent } from './line-page/line-page.component';
import { BusStopPageComponent } from './bus-stop-page/bus-stop-page.component';
import { APP_TITLE, BUS_LINE_PATH, HOME_PATH, UNKNOWN_PATH } from './app.routes.constants';

export const routes: Routes = [
  { path: HOME_PATH, component: LandingPageComponent, title: APP_TITLE },
  { path: `${BUS_LINE_PATH}/:busLineNumber`, component: LinePageComponent },
  { path: `${BUS_LINE_PATH}/:busLineNumber/:busStopId`, component: BusStopPageComponent },
  { path: UNKNOWN_PATH, redirectTo: HOME_PATH },
];
