import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { NewsPageComponent } from './news-page.component';
import { createNews, createNewsLinks, createNewsParagraph, createNewsResponse } from '../core/news/news.generator';
import { NEWS_URL } from '../core/news/news.constants';

describe('NewsPageComponent', () => {
  let component: NewsPageComponent;
  let fixture: ComponentFixture<NewsPageComponent>;

  const paragraph = createNewsParagraph();
  const links = createNewsLinks();
  const news = createNews({ content: [paragraph, links] });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewsPageComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsPageComponent);
    component = fixture.componentInstance;
    TestBed.inject(HttpTestingController).expectOne(NEWS_URL).flush(createNewsResponse({ news: [news] }));
    fixture.componentRef.setInput('newsId', String(news.id));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows the news title, date, image and source', () => {
    const page: HTMLElement = fixture.nativeElement;
    expect(page.querySelector('h5')?.textContent).toBe(news.title);
    expect(page.querySelector('.news-page__date')?.textContent?.trim()).toBe('02.08.2026.');
    expect(page.querySelector('.news-page__image')?.getAttribute('alt')).toBe(news.imageAlt);
    expect(page.querySelector('.news-page__source')?.getAttribute('href')).toBe(news.source.url);
  });

  it('shows the paragraphs and links of the news in order', () => {
    const page: HTMLElement = fixture.nativeElement;
    expect(page.querySelector('.news-page__paragraph')?.textContent).toBe(paragraph.text);
    expect(page.querySelector('.news-page__link')?.getAttribute('href')).toBe(links.links[0].url);
  });
});
