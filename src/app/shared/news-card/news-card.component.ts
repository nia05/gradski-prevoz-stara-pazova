import { Component, computed, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { NEWS_DATE_FORMAT } from '../../core/news/news.constants';
import { getNewsLink } from '../../app.routes.links';
import { IconPath } from '../icon-path.model';

@Component({
  selector: 'app-news-card',
  imports: [DatePipe, RouterLink],
  templateUrl: './news-card.component.html',
  styleUrl: './news-card.component.scss'
})
export class NewsCardComponent {
  readonly newsId = input.required<number>();
  readonly newsImage = input.required<string>();
  readonly newsTitle = input.required<string>();
  readonly newsDate = input.required<string>();

  protected readonly iconPath = IconPath;
  protected readonly newsDateFormat = NEWS_DATE_FORMAT;
  protected readonly newsLink = computed(() => getNewsLink(this.newsId()));
}
