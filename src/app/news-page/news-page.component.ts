import { Component, input } from '@angular/core';

@Component({
  selector: 'app-news-page',
  imports: [],
  templateUrl: './news-page.component.html',
  styleUrl: './news-page.component.scss'
})
export class NewsPageComponent {
  readonly newsId = input.required<string>();
}
