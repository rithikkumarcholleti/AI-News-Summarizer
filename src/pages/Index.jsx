/**
 * Home Page
 * 
 * Main page of the AI News Summarizer application.
 * Combines all components and manages global state.
 */

import { useState, useMemo, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { FiltersBar } from '@/components/FiltersBar';
import { NewsList } from '@/components/NewsList';
import { useNewsFetcher } from '@/hooks/useNewsFetcher';
import { useAIProcessing } from '@/hooks/useAIProcessing';

const Index = () => {
  // State for filters
  const [category, setCategory] = useState('technology');
  const [searchQuery, setSearchQuery] = useState('');
  const [sentimentFilter, setSentimentFilter] = useState('all');

  // Fetch news based on category and search
  const { 
    articles, 
    isLoading, 
    error, 
    refetch 
  } = useNewsFetcher({ 
    category, 
    query: searchQuery 
  });

  // Process articles with AI
  const {
    processedArticles,
    isProcessing,
    processAllArticles,
    toggleSummary
  } = useAIProcessing(articles);

  // Auto-process articles when they load
  useEffect(() => {
    if (articles.length > 0 && !isLoading) {
      processAllArticles();
    }
  }, [articles, isLoading]);

  // Calculate sentiment counts for filters
  const sentimentCounts = useMemo(() => {
    const counts = {
      all: processedArticles.length,
      positive: 0,
      neutral: 0,
      negative: 0
    };
    
    processedArticles.forEach(article => {
      if (article.sentiment) {
        counts[article.sentiment]++;
      }
    });
    
    return counts;
  }, [processedArticles]);

  // Handle category change
  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setSearchQuery('');
    setSentimentFilter('all');
  };

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    setSentimentFilter('all');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6 md:py-8">
        <div className="space-y-6">
          <FiltersBar
            selectedCategory={category}
            onCategoryChange={handleCategoryChange}
            onSearch={handleSearch}
            sentimentFilter={sentimentFilter}
            onSentimentFilterChange={setSentimentFilter}
            sentimentCounts={sentimentCounts}
            onProcessAll={processAllArticles}
            isProcessing={isProcessing}
          />
          
          <NewsList
            articles={processedArticles}
            isLoading={isLoading}
            error={error}
            sentimentFilter={sentimentFilter}
            searchQuery={searchQuery}
            onToggleSummary={toggleSummary}
            onRetry={refetch}
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
