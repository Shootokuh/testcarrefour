export type NewsApiItem = {
  id: number | string;
  title?: string;
  imageUrl?: string;
  imageWeb?: string | null;
  link?: string;
  isPublished?: number | boolean;
  isMobile?: number | boolean;
  position?: number;
  publishedStartDate?: string;
  publishedEndDate?: string;
};

export type NewsItem = {
  id: number | string;
  title: string;
  imageUrl: string;
  linkUrl?: string;
};
