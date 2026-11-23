import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';

import { NEWS_DATE_FORMAT } from '../../core/news/news.constants';

@Component({
  selector: 'app-news-card',
  imports: [DatePipe],
  templateUrl: './news-card.component.html',
  styleUrl: './news-card.component.scss'
})
export class NewsCardComponent {
  readonly newsImage = input.required<string>();
  readonly newsTitle = input.required<string>();
  readonly newsDate = input.required<string>();

  protected readonly newsDateFormat = NEWS_DATE_FORMAT;
}
