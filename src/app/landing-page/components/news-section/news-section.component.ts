import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NewsCardComponent } from '../../../shared/news-card/news-card.component';
import { NewsService } from '../../../core/news/news.service';
import { NEWS_PATH } from '../../../app.routes.constants';
import { LATEST_NEWS_COUNT } from './news-section.constants';

@Component({
  selector: 'app-news-section',
  imports: [NewsCardComponent, RouterLink],
  templateUrl: './news-section.component.html',
  styleUrl: './news-section.component.scss'
})
export class NewsSectionComponent {
  private readonly news = inject(NewsService).news;

  protected readonly newsPath = NEWS_PATH;
  protected readonly latestNews = computed(() => this.news().slice(0, LATEST_NEWS_COUNT));
}
