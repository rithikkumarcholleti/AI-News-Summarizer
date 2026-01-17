import { useState, useCallback, useRef, useEffect } from 'react';
import { summarizeText, analyzeSentiment } from '@/services/aiApi';

export function useAIProcessing(articles) {
  const [processedMap, setProcessedMap] = useState(new Map());
  const [processingSet, setProcessingSet] = useState(new Set());
  const [showSummarySet, setShowSummarySet] = useState(new Set());
  const [error, setError] = useState(null);
  const cacheRef = useRef(new Map());

  useEffect(() => {
    setProcessingSet(new Set());
    setShowSummarySet(new Set());
  }, [articles]);

  const processArticle = useCallback(async (articleId) => {
    if (cacheRef.current.has(articleId)) {
      setProcessedMap(prev => new Map(prev).set(articleId, cacheRef.current.get(articleId)));
      return;
    }
    const article = articles.find(a => a.id === articleId);
    if (!article) return;
    
    setProcessingSet(prev => new Set(prev).add(articleId));
    try {
      const fullText = `${article.title}. ${article.description}. ${article.content}`.trim();
      const [summary, sentimentResult] = await Promise.all([summarizeText(fullText), analyzeSentiment(fullText)]);
      const processedData = { summary, sentiment: sentimentResult.label, sentimentScore: sentimentResult.score };
      cacheRef.current.set(articleId, processedData);
      setProcessedMap(prev => new Map(prev).set(articleId, processedData));
    } catch (err) {
      const fallbackData = { summary: article.description, sentiment: 'neutral', sentimentScore: 0.5 };
      cacheRef.current.set(articleId, fallbackData);
      setProcessedMap(prev => new Map(prev).set(articleId, fallbackData));
    } finally {
      setProcessingSet(prev => { const next = new Set(prev); next.delete(articleId); return next; });
    }
  }, [articles]);

  const processAllArticles = useCallback(async () => {
    const unprocessed = articles.filter(a => !cacheRef.current.has(a.id));
    if (unprocessed.length === 0) return;
    setProcessingSet(new Set(unprocessed.map(a => a.id)));
    for (let i = 0; i < unprocessed.length; i += 3) {
      await Promise.all(unprocessed.slice(i, i + 3).map(a => processArticle(a.id)));
    }
  }, [articles, processArticle]);

  const toggleSummary = useCallback((articleId) => {
    setShowSummarySet(prev => {
      const next = new Set(prev);
      if (next.has(articleId)) next.delete(articleId);
      else { next.add(articleId); if (!cacheRef.current.has(articleId)) processArticle(articleId); }
      return next;
    });
  }, [processArticle]);

  const processedArticles = articles.map(article => ({
    ...article,
    ...processedMap.get(article.id),
    isProcessing: processingSet.has(article.id),
    showSummary: showSummarySet.has(article.id)
  }));

  return { processedArticles, isProcessing: processingSet.size > 0, error, processArticle, processAllArticles, toggleSummary };
}
