import { NEWS_API_KEY } from "./localMode";

const NEWS_API_BASE = "https://newsapi.org/v2";
const TIMEOUT_MS = 8000;

function fetchWithTimeout(url, timeout = TIMEOUT_MS) {
  return Promise.race([
    fetch(url),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), timeout)
    ),
  ]);
}

async function safeFetch(url, retries = 2) {
  try {
    const response = await fetchWithTimeout(url);
    const data = await response.json();
    if (data.status === "error") throw new Error(data.message);
    return data;
  } catch (err) {
    if (retries > 0) {
      return safeFetch(url, retries - 1);
    }
    throw err;
  }
}

export async function fetchNewsLocal(category = "general", query) {
  if (!NEWS_API_KEY) {
    console.warn("NewsAPI key missing – returning empty list");
    return { status: "ok", totalResults: 0, articles: [] };
  }

  let url;
  if (query && query.trim()) {
    url = `${NEWS_API_BASE}/everything?q=${encodeURIComponent(
      query
    )}&sortBy=publishedAt&pageSize=20&apiKey=${NEWS_API_KEY}`;
  } else {
    url = `${NEWS_API_BASE}/top-headlines?category=${category}&country=us&pageSize=20&apiKey=${NEWS_API_KEY}`;
  }

  try {
    const data = await safeFetch(url);

    const articles = (data.articles || [])
      .filter((article) => article.title && article.title !== "[Removed]")
      .map((article, index) => ({
        id: `${article.source?.id || "news"}-${Date.now()}-${index}`,
        source: { id: article.source?.id || null, name: article.source?.name || "Unknown" },
        author: article.author || null,
        title: article.title,
        description: article.description || "",
        url: article.url,
        urlToImage: article.urlToImage || null,
        publishedAt: article.publishedAt,
        content: article.content || article.description || "",
      }));

    return { status: "ok", totalResults: data.totalResults || articles.length, articles };
  } catch (err) {
    console.warn("News fetch failed, using empty fallback:", err.message);
    return { status: "ok", totalResults: 0, articles: [] };
  }
}
