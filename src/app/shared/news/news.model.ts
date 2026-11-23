export interface NewsResponse {
  news: News[];
}

export interface News {
  id: number;
  title: string;
  date: string;
  image: string;
}
