export enum NewsContentType {
  Paragraph = 'paragraph',
  Links = 'links',
}

export interface NewsResponse {
  news: News[];
}

export interface News {
  id: number;
  title: string;
  date: string;
  image: string;
  imageAlt: string;
  source: NewsSource;
  content: NewsContent[];
}

export interface NewsSource {
  name: string;
  url: string;
}

export type NewsContent = NewsParagraph | NewsLinks;

export interface NewsParagraph {
  type: NewsContentType.Paragraph;
  text: string;
}

export interface NewsLinks {
  type: NewsContentType.Links;
  links: NewsLink[];
}

export interface NewsLink {
  text: string;
  url: string;
}
