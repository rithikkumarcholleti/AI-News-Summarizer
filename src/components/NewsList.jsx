/**
 * NewsList Component
 * 
 * Displays a grid of news cards with loading and empty states.
 */

import { NewsCard } from './NewsCard';
import { SkeletonNewsCard } from './SkeletonNewsCard';
import { ErrorMessage, EmptyState } from './ErrorMessage';

export function NewsList({
  articles,
  isLoading,
  error,
  sentimentFilter,
  searchQuery,
  onToggleSummary,
  onRetry
}) {
  // Filter articles by sentiment
  const filteredArticles = sentimentFilter === 'all'
    ? articles
    : articles.filter(article => article.sentiment === sentimentFilter);

  if (isLoading) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonNewsCard key={i} />
      ))}
    </div>
  );
}

  if (error) {
    return (
      <ErrorMessage
        title="Unable to load news"
        message={error}
        onRetry={onRetry}
      />
    );
  }

  if (articles.length === 0) {
    return <EmptyState query={searchQuery} />;
  }

  if (filteredArticles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          No {sentimentFilter} articles found. Try selecting a different filter.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredArticles.map((article) => (
        <NewsCard
          key={article.id}
          article={article}
          onToggleSummary={onToggleSummary}
        />
      ))}
    </div>
  );
}
