/**
 * FiltersBar Component
 * 
 * Contains all filter controls: categories, search, and sentiment filter.
 */

import { CategoryTabs } from './CategoryTabs';
import { SearchBar } from './SearchBar';
import { SentimentFilter } from './SentimentFilter';
import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function FiltersBar({
  selectedCategory,
  onCategoryChange,
  onSearch,
  sentimentFilter,
  onSentimentFilterChange,
  sentimentCounts,
  onProcessAll,
  isProcessing
}) {
  return (
    <div className="space-y-4 pb-4 border-b border-border">
      {/* Top row: Categories and Search */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <CategoryTabs
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
        />
        <div className="flex items-center gap-3">
          <SearchBar onSearch={onSearch} />
          {onProcessAll && (
            <Button
              onClick={onProcessAll}
              disabled={isProcessing}
              size="sm"
              className="gap-2 whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">
                {isProcessing ? 'Processing...' : 'Analyze All'}
              </span>
            </Button>
          )}
        </div>
      </div>
      
      {/* Bottom row: Sentiment filter */}
      <div className="flex items-center justify-between">
        <SentimentFilter
          selectedFilter={sentimentFilter}
          onFilterChange={onSentimentFilterChange}
          counts={sentimentCounts}
        />
        {sentimentCounts && (
          <span className="text-xs text-muted-foreground hidden md:block">
            {sentimentCounts.all} articles
          </span>
        )}
      </div>
    </div>
  );
}
