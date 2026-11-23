import { News, NewsResponse } from './news.model';

export function createNews(news: Partial<News> = {}): News {
  return Object.assign(
    {
      id: 1,
      title: 'Javni prevoz u opštini Stara Pazova: Pogledajte koje su linije i gde naći red vožnje',
      date: '2026-08-02',
      image: 'images/news/novi-autobusi.jpg',
    },
    news
  );
}

export function createNewsResponse(response: Partial<NewsResponse> = {}): NewsResponse {
  return Object.assign(
    { news: [createNews()] },
    response
  );
}
