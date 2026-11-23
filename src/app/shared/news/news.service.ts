import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { NewsResponse } from './news.model';
import { EMPTY_NEWS_RESPONSE, NEWS_URL } from './news.constants';

@Injectable({ providedIn: 'root' })
export class NewsService {
  private readonly http = inject(HttpClient);

  private readonly data = toSignal(
    this.http.get<NewsResponse>(NEWS_URL),
    { initialValue: EMPTY_NEWS_RESPONSE }
  );

  readonly news = computed(() => this.data().news);
}
