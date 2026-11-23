import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsCardComponent } from './news-card.component';
import { createNews } from '../../core/news/news.generator';

describe('NewsCardComponent', () => {
  let component: NewsCardComponent;
  let fixture: ComponentFixture<NewsCardComponent>;

  const news = createNews();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsCardComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('newsImage', news.image);
    fixture.componentRef.setInput('newsTitle', news.title);
    fixture.componentRef.setInput('newsDate', news.date);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows the news title, image and date in Serbian format', () => {
    const card: HTMLElement = fixture.nativeElement;
    expect(card.querySelector('.news-card__title')?.textContent).toBe(news.title);
    expect(card.querySelector('.news-card__image')?.getAttribute('src')).toBe(news.image);
    expect(card.querySelector('.news-card__date')?.textContent?.trim()).toBe('02.08.2026.');
  });
});
