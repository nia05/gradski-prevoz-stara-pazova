import { RouteLink } from './app.routes.model';

export const APP_TITLE = 'Gradski prevoz Stara Pazova';

export const ROOT_PATH = '/';
export const HOME_PATH = '';
export const BUS_LINE_PATH = 'linija';
export const NEWS_PATH = 'vesti';
export const UNKNOWN_PATH = '**';

export const HOME_LINK: RouteLink = [ROOT_PATH, HOME_PATH];
export const NEWS_LIST_LINK: RouteLink = [ROOT_PATH, NEWS_PATH];
