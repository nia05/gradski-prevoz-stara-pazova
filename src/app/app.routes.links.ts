import { RouteLink } from './app.routes.model';
import { BUS_LINE_PATH, NEWS_PATH, ROOT_PATH } from './app.routes.constants';

export function getBusLineLink(busLineNumber: number): RouteLink {
  return [ROOT_PATH, BUS_LINE_PATH, busLineNumber];
}

export function getBusStopLink(busLineNumber: number, busStopId: string): RouteLink {
  return [...getBusLineLink(busLineNumber), busStopId];
}

export function getNewsLink(newsId: number): RouteLink {
  return [ROOT_PATH, NEWS_PATH, newsId];
}
