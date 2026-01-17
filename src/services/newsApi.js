import { isLocalMode } from './localMode';
import { fetchNewsLocal } from './newsApi.local';

export async function fetchNews(category = 'general', query) {
  return fetchNewsLocal(category, query);
}
