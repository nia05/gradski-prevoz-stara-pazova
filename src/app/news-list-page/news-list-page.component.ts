import { Component, computed, inject, signal } from '@angular/core';

import { NewsService } from '../core/news/news.service';
import { NewsCardComponent } from '../shared/news-card/news-card.component';
import { BreadcrumbComponent } from '../shared/breadcrumb/breadcrumb.component';
import { BreadcrumbLink } from '../shared/breadcrumb/breadcrumb.model';
import { HOME_BREADCRUMB_LINK } from '../shared/breadcrumb/breadcrumb.constants';
import { NEWS_PATH } from '../app.routes.constants';
import { NEWS_PAGE_SIZE } from './news-list-page.constants';

@Component({
  selector: 'app-news-list-page',
  imports: [NewsCardComponent, BreadcrumbComponent],
  templateUrl: './news-list-page.component.html',
  styleUrl: './news-list-page.component.scss'
})
export class NewsListPageComponent {
  private readonly news = inject(NewsService).news;
  private readonly visibleNewsCount = signal(NEWS_PAGE_SIZE);

  protected readonly breadcrumbLinks: BreadcrumbLink[] = [
    HOME_BREADCRUMB_LINK,
    { name: 'Vesti', link: ['/', NEWS_PATH] },
  ];

  protected readonly visibleNews = computed(() => this.news().slice(0, this.visibleNewsCount()));

  protected readonly hasOlderNews = computed(() => this.news().length > this.visibleNewsCount());

  protected showOlderNews(): void {
    this.visibleNewsCount.update(visibleNewsCount => visibleNewsCount + NEWS_PAGE_SIZE);
  }
}
