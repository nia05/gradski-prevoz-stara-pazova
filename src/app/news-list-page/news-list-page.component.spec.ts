import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { NewsListPageComponent } from './news-list-page.component';
import { createNews, createNewsResponse } from '../core/news/news.generator';
import { NEWS_URL } from '../core/news/news.constants';
import { NEWS_PATH } from '../app.routes.constants';
import { NEWS_PAGE_SIZE } from './news-list-page.constants';

describe('NewsListPageComponent', () => {
  let component: NewsListPageComponent;
  let fixture: ComponentFixture<NewsListPageComponent>;

  function createNewsList(count: number) {
    return Array.from({ length: count }, (_, index) => createNews({ id: index + 1 }));
  }

  async function openNewsList(newsCount: number): Promise<void> {
    await TestBed.configureTestingModule({
      imports: [NewsListPageComponent],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsListPageComponent);
    component = fixture.componentInstance;
    TestBed.inject(HttpTestingController)
      .expectOne(NEWS_URL)
      .flush(createNewsResponse({ news: createNewsList(newsCount) }));
    fixture.detectChanges();
  }

  function getCards(): HTMLAnchorElement[] {
    return Array.from(fixture.nativeElement.querySelectorAll('.news-card'));
  }

  function getOlderNewsButton(): HTMLButtonElement | null {
    return fixture.nativeElement.querySelector('.btn--secondary');
  }

  it('should create', async () => {
    await openNewsList(2);
    expect(component).toBeTruthy();
  });

  it('shows a card for each news that links to that news', async () => {
    await openNewsList(2);
    expect(getCards().map(card => card.getAttribute('href'))).toEqual([`/${NEWS_PATH}/1`, `/${NEWS_PATH}/2`]);
  });

  it('has no older news button when all news fit on one page', async () => {
    await openNewsList(NEWS_PAGE_SIZE);
    expect(getCards().length).toBe(NEWS_PAGE_SIZE);
    expect(getOlderNewsButton()).toBeNull();
  });

  it('shows the next page of older news when the button is clicked', async () => {
    await openNewsList(NEWS_PAGE_SIZE + 2);
    expect(getCards().length).toBe(NEWS_PAGE_SIZE);
    getOlderNewsButton()?.click();
    fixture.detectChanges();
    expect(getCards().length).toBe(NEWS_PAGE_SIZE + 2);
    expect(getOlderNewsButton()).toBeNull();
  });
});
