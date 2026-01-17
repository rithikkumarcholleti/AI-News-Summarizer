import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchNews } from '@/services/newsApi';

export function useNewsFetcher({ category = 'general', query = '', debounceMs = 300 } = {}) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);
  const isMounted = useRef(true);
  const debounceTimeout = useRef(null);

  const fetchArticles = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetchNews(category, query);
      if (isMounted.current) {
        setArticles(response.articles);
        setTotalResults(response.totalResults);
      }
    } catch (err) {
      if (isMounted.current) {
        setError(err instanceof Error ? err.message : 'Failed to fetch news.');
        setArticles([]);
      }
    } finally {
      if (isMounted.current) setIsLoading(false);
    }
  }, [category, query]);

  useEffect(() => {
    isMounted.current = true;
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    if (query) debounceTimeout.current = setTimeout(fetchArticles, debounceMs);
    else fetchArticles();
    return () => {
      isMounted.current = false;
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [category, query, debounceMs, fetchArticles]);

  return { articles, isLoading, error, refetch: fetchArticles, totalResults };
}
