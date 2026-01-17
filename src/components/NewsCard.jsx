/**
 * NewsCard Component
 * 
 * Displays a single news article with:
 * - Thumbnail image
 * - Title and source
 * - Description or AI summary
 * - Sentiment badge
 * - Toggle for original/summary view
 * - Link to full article
 */

import { ExternalLink, Sparkles } from 'lucide-react';
import { formatDate, getRelativeTime } from '@/utils/formatDate';
import { truncateText } from '@/utils/truncateText';
import { SentimentBadge } from './SentimentBadge';
import { ToggleSwitch } from './ToggleSwitch';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function NewsCard({ article, onToggleSummary }) {
  const {
    id,
    title,
    description,
    url,
    urlToImage,
    publishedAt,
    source,
    summary,
    sentiment,
    isProcessing,
    showSummary
  } = article;

  // Determine which content to show
  const displayContent = showSummary && summary 
    ? summary 
    : truncateText(description || '', 180);

  const hasAIContent = summary || sentiment;

  return (
    <article 
      className={cn(
        "group bg-card rounded-xl border border-border overflow-hidden",
        "transition-all duration-300 card-hover",
        "animate-slide-up"
      )}
      style={{ animationDelay: `${Math.random() * 0.2}s` }}
    >
      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-muted">
        {urlToImage ? (
          <img
            src={urlToImage}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-secondary">
            <span className="text-4xl">📰</span>
          </div>
        )}
        
        {/* Sentiment badge overlay */}
        {sentiment && (
          <div className="absolute top-3 right-3">
            <SentimentBadge sentiment={sentiment} size="sm" />
          </div>
        )}
        
        {/* AI processed indicator */}
        {hasAIContent && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-1 bg-background/90 backdrop-blur-sm rounded-full text-xs">
            <Sparkles className="w-3 h-3 text-primary" />
            <span className="text-foreground font-medium">AI Enhanced</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Meta info */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">{source.name}</span>
          <span>•</span>
          <time dateTime={publishedAt} title={formatDate(publishedAt)}>
            {getRelativeTime(publishedAt)}
          </time>
        </div>

        {/* Title */}
        <h2 className="font-headline text-lg font-semibold text-foreground leading-tight line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h2>

        {/* Description/Summary */}
        <div className="relative">
          {isProcessing && (
            <div className="absolute inset-0 bg-card/80 backdrop-blur-sm flex items-center justify-center rounded">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <span>Analyzing...</span>
              </div>
            </div>
          )}
          <p className={cn(
            "text-sm text-muted-foreground leading-relaxed",
            showSummary && "text-foreground italic"
          )}>
            {displayContent}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-2 pt-2 border-t border-border">
          <ToggleSwitch
            isOn={showSummary || false}
            onToggle={() => onToggleSummary(id)}
            loading={isProcessing}
          />
          
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="text-xs gap-1.5 text-muted-foreground hover:text-foreground"
          >
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Read Full Article
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}
