import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { NewsSectionComponent } from './news-section.component';
import { createNews, createNewsResponse } from '../../../core/news/news.generator';
import { NEWS_URL } from '../../../core/news/news.constants';
import { NEWS_PATH } from '../../../app.routes.constants';

describe('NewsSectionComponent', () => {
  let component: NewsSectionComponent;
  let fixture: ComponentFixture<NewsSectionComponent>;

  const firstNews = createNews();
  const secondNews = createNews({ id: 2, title: 'Linija 6 ne može do Železničke stanice zbog nepropisno parkiranih vozila' });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsSectionComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsSectionComponent);
    component = fixture.componentInstance;
    TestBed.inject(HttpTestingController)
      .expectOne(NEWS_URL)
      .flush(createNewsResponse({ news: [firstNews, secondNews] }));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows a news card for each news', () => {
    const titles = Array.from<HTMLElement>(fixture.nativeElement.querySelectorAll('.news-card__title'))
      .map(title => title.textContent);
    expect(titles).toEqual([firstNews.title, secondNews.title]);
  });

  it('links to the page with all news', () => {
    const allNewsLink: HTMLAnchorElement = fixture.nativeElement.querySelector('.news-section__heading a');
    expect(allNewsLink.getAttribute('href')).toBe('/' + NEWS_PATH);
  });
});
