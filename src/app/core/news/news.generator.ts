import { News, NewsContentType, NewsLinks, NewsParagraph, NewsResponse } from './news.model';

export function createNewsParagraph(paragraph: Partial<NewsParagraph> = {}): NewsParagraph {
  return Object.assign(
    {
      type: NewsContentType.Paragraph as const,
      text: 'Od ponedeljka, 6. jula 2026. godine, na teritoriji opštine Stara Pazova počeo je sa radom novi sistem gradskog i prigradskog javnog prevoza putnika.',
    },
    paragraph
  );
}

export function createNewsLinks(links: Partial<NewsLinks> = {}): NewsLinks {
  return Object.assign(
    {
      type: NewsContentType.Links as const,
      links: [{ text: 'https://starapazova.rs/rs/privreda/saobracaj-2.html', url: 'https://starapazova.rs/rs/privreda/saobracaj-2.html' }],
    },
    links
  );
}

export function createNews(news: Partial<News> = {}): News {
  return Object.assign(
    {
      id: 1,
      title: 'Javni prevoz u opštini Stara Pazova: Pogledajte koje su linije i gde naći red vožnje',
      date: '2026-08-02',
      image: 'images/news/novi-autobusi.jpg',
      imageAlt: 'Novi plavi autobusi parkirani na parkingu',
      source: { name: 'RTV Stara Pazova', url: 'https://www.rtvstarapazova.rs/sr/vest.php?id=22342' },
      content: [createNewsParagraph(), createNewsLinks()],
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
