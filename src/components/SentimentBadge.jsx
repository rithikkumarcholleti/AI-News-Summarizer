/**
 * SentimentBadge Component
 * 
 * Displays a colored badge indicating article sentiment.
 * Props:
 * - sentiment: 'positive' | 'neutral' | 'negative'
 * - showLabel: Whether to show the text label
 */

import { sentimentConfig } from '@/utils/sentimentConfig';
import { cn } from '@/lib/utils';

export function SentimentBadge({ 
  sentiment, 
  showLabel = true, 
  size = 'md',
  className 
}) {
  const config = sentimentConfig[sentiment];
  
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-2.5 py-1 text-xs gap-1.5',
    lg: 'px-3 py-1.5 text-sm gap-2'
  };
  
  const colorClasses = {
    positive: 'bg-sentiment-positive-bg text-sentiment-positive-foreground',
    neutral: 'bg-sentiment-neutral-bg text-sentiment-neutral-foreground',
    negative: 'bg-sentiment-negative-bg text-sentiment-negative-foreground'
  };
  
  return (
    <span 
      className={cn(
        "inline-flex items-center rounded-full font-medium transition-transform hover:scale-105",
        sizeClasses[size],
        colorClasses[sentiment],
        className
      )}
      title={config.description}
    >
      <span role="img" aria-label={config.label}>{config.icon}</span>
      {showLabel && <span>{config.label}</span>}
    </span>
  );
}
