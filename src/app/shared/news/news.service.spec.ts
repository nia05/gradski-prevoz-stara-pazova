import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { NewsService } from './news.service';
import { createNewsResponse } from './news.generator';
import { NEWS_URL } from './news.constants';

describe('NewsService', () => {
  let service: NewsService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(NewsService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('has no news before the data is loaded', () => {
    expect(service.news()).toEqual([]);
  });

  it('returns the news from the loaded data', () => {
    const mockData = createNewsResponse();
    httpTesting.expectOne(NEWS_URL).flush(mockData);
    expect(service.news()).toEqual(mockData.news);
  });
});
