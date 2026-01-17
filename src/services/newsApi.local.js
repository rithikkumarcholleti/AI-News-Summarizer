import { NEWS_API_KEY } from './localMode';

const NEWS_API_BASE = 'https://newsapi.org/v2';

export async function fetchNewsLocal(category = 'general', query) {
  if (!NEWS_API_KEY) {
    throw new Error('NewsAPI key not configured. Please add VITE_NEWS_API_KEY to your .env file.');
  }

  let url;
  if (query && query.trim()) {
    url = `${NEWS_API_BASE}/everything?q=${encodeURIComponent(query)}&sortBy=publishedAt&pageSize=20&apiKey=${NEWS_API_KEY}`;
  } else {
    url = `${NEWS_API_BASE}/top-headlines?category=${category}&country=us&pageSize=20&apiKey=${NEWS_API_KEY}`;
  }

  const response = await fetch(url);
  const data = await response.json();

  if (data.status === 'error') {
    throw new Error(data.message || 'Failed to fetch news');
  }

  const articles = (data.articles || [])
    .filter((article) => article.title && article.title !== '[Removed]')
    .map((article, index) => ({
      id: `${article.source?.id || 'news'}-${Date.now()}-${index}`,
      source: { id: article.source?.id || null, name: article.source?.name || 'Unknown' },
      author: article.author || null,
      title: article.title,
      description: article.description || '',
      url: article.url,
      urlToImage: article.urlToImage || null,
      publishedAt: article.publishedAt,
      content: article.content || article.description || ''
    }));

  return { status: 'ok', totalResults: data.totalResults || articles.length, articles };
}
