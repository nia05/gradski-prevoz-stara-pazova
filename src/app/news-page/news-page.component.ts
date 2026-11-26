import { Component, computed, inject, input } from '@angular/core';
import { DatePipe } from '@angular/common';

import { NewsService } from '../core/news/news.service';
import { NewsContentType } from '../core/news/news.model';
import { NEWS_DATE_FORMAT } from '../core/news/news.constants';
import { BreadcrumbComponent } from '../shared/breadcrumb/breadcrumb.component';
import { BreadcrumbLink } from '../shared/breadcrumb/breadcrumb.model';
import { HOME_BREADCRUMB_LINK, NEWS_BREADCRUMB_LINK } from '../shared/breadcrumb/breadcrumb.constants';
import { IconPath } from '../shared/icon-path.model';
import { getNewsLink } from '../app.routes.links';

@Component({
  selector: 'app-news-page',
  imports: [DatePipe, BreadcrumbComponent],
  templateUrl: './news-page.component.html',
  styleUrl: './news-page.component.scss'
})
export class NewsPageComponent {
  private readonly newsService = inject(NewsService);

  readonly newsId = input.required<string>();

  protected readonly iconPath = IconPath;
  protected readonly newsContentType = NewsContentType;
  protected readonly newsDateFormat = NEWS_DATE_FORMAT;

  protected readonly news = computed(
    () => this.newsService.news().find(news => news.id === Number(this.newsId()))
  );

  protected readonly breadcrumbLinks = computed<BreadcrumbLink[]>(() => {
    const news = this.news();
    if (!news) {
      return [];
    }
    return [
      HOME_BREADCRUMB_LINK,
      NEWS_BREADCRUMB_LINK,
      { name: news.title, link: getNewsLink(news.id) },
    ];
  });
}
