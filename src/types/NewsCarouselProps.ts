import type { NewsItem } from "./news";

export type NewsCarouselProps = {
  fetchNews: () => Promise<NewsItem[]>;
};
