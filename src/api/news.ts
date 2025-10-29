import type { NewsApiItem, NewsItem } from "../types/news";

const API = "https://api-smartclub.carrefour-martinique.com/api/v1/news?region=MQ";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.Ht1sbj0XNhOFaf5vT3uu-ud4D7QSPmz5K-4ZHCy3zFg";
const S3_BASE = "https://s3.eu-west-3.amazonaws.com/media-smartclub.carrefour-martinique/media/";

function toAbsolute(file?: string | null) {
  if (!file) return "";
  if (/^https?:\/\//i.test(file)) return file;
  return `${S3_BASE}${file.replace(/^\/+/, "")}`;
}

function isNowWithin(start?: string, end?: string) {
  const now = new Date();
  const s = start ? new Date(start) : null;
  const e = end ? new Date(end) : null;
  return (!s || now >= s) && (!e || now <= e);
}

export async function fetchNews(): Promise<NewsItem[]> {
  const res = await fetch(API, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const json = await res.json();
  const list: NewsApiItem[] = Array.isArray(json?.result) ? json.result : [];

  const items: NewsItem[] = list
    .filter((n) => Number(n.isPublished) === 1)
    .filter((n) => Number(n.isMobile) === 1)
    .filter((n: any) => isNowWithin(n.publishedStartDate, n.publishedEndDate))
    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
    // priorité à l’image MOBILE
    .map((n) => {
      const file = n.imageUrl || n.imageWeb || "";
      return {
        id: n.id,
        title: n.title ?? "",
        imageUrl: toAbsolute(file),
        linkUrl: n.link || undefined,
      };
    })
    // on garde seulement ceux qui ont une image
    .filter((n) => !!n.imageUrl);

  if (!items.length) throw new Error("News: empty list");
  return items;
}
