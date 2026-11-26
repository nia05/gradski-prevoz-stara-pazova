import { BreadcrumbLink } from './breadcrumb.model';
import { PageName } from '../../app.routes.model';
import { HOME_LINK, NEWS_LIST_LINK } from '../../app.routes.constants';

export const HOME_BREADCRUMB_LINK: BreadcrumbLink = { name: PageName.Home, link: HOME_LINK };
export const NEWS_BREADCRUMB_LINK: BreadcrumbLink = { name: PageName.NewsList, link: NEWS_LIST_LINK };
