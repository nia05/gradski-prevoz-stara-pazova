import { PageName } from './app.routes.model';

export function getBusLinePageName(busLineNumber: number): string {
  return `${PageName.BusLine} ${busLineNumber}`;
}
