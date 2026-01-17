/**
 * SentimentFilter Component
 * 
 * Provides filter buttons to show articles by sentiment type.
 */

import { sentimentConfig } from '@/utils/sentimentConfig';
import { cn } from '@/lib/utils';

const filters = [
  { value: 'all', label: 'All' },
  { value: 'positive', label: 'Positive', icon: sentimentConfig.positive.icon },
  { value: 'neutral', label: 'Neutral', icon: sentimentConfig.neutral.icon },
  { value: 'negative', label: 'Negative', icon: sentimentConfig.negative.icon },
];

export function SentimentFilter({ selectedFilter, onFilterChange, counts }) {
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      <span className="text-sm text-muted-foreground mr-1 hidden sm:inline">Filter:</span>
      {filters.map((filter) => {
        const isSelected = selectedFilter === filter.value;
        const count = counts?.[filter.value];
        
        return (
          <button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            className={cn(
              "px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-200",
              "flex items-center gap-1 border",
              isSelected
                ? filter.value === 'all'
                  ? "bg-foreground text-background border-foreground"
                  : filter.value === 'positive'
                    ? "bg-sentiment-positive text-sentiment-positive-foreground border-sentiment-positive"
                    : filter.value === 'neutral'
                      ? "bg-sentiment-neutral text-sentiment-neutral-foreground border-sentiment-neutral"
                      : "bg-sentiment-negative text-sentiment-negative-foreground border-sentiment-negative"
                : "bg-card text-muted-foreground border-border hover:bg-secondary"
            )}
          >
            {filter.icon && <span>{filter.icon}</span>}
            <span>{filter.label}</span>
            {count !== undefined && (
              <span className={cn(
                "ml-0.5 px-1.5 py-0.5 rounded-full text-[10px]",
                isSelected ? "bg-background/20" : "bg-muted"
              )}>
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
