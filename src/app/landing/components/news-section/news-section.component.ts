import { Component, inject } from '@angular/core';

import { NewsCardComponent } from '../../../shared/news-card/news-card.component';
import { NewsService } from '../../../shared/news/news.service';

@Component({
  selector: 'app-news-section',
  imports: [NewsCardComponent],
  templateUrl: './news-section.component.html',
  styleUrl: './news-section.component.scss'
})
export class NewsSectionComponent {
  protected readonly news = inject(NewsService).news;
}
