import { Component, input } from '@angular/core';

@Component({
  selector: 'app-news-card',
  imports: [],
  templateUrl: './news-card.component.html',
  styleUrl: './news-card.component.scss'
})
export class NewsCardComponent { 
  readonly newsImage = input.required<string>();
  readonly newsTitle = input.required<string>();
  readonly newsDate = input.required<string>();
  readonly newsTime = input.required<string>();
}
