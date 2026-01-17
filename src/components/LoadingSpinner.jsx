/**
 * LoadingSpinner Component
 * 
 * A customizable loading spinner with optional text.
 */

import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function LoadingSpinner({ 
  size = 'md', 
  text, 
  className,
  fullScreen = false 
}) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-10 h-10'
  };
  
  const content = (
    <div className={cn("flex flex-col items-center justify-center gap-3", className)}>
      <Loader2 className={cn(sizeClasses[size], "animate-spin text-primary")} />
      {text && (
        <p className="text-sm text-muted-foreground animate-pulse">{text}</p>
      )}
    </div>
  );
  
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-50">
        {content}
      </div>
    );
  }
  
  return content;
}

/**
 * Skeleton loader for news cards
 */
export function NewsCardSkeleton() {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden animate-fade-in">
      <div className="skeleton h-48 w-full" />
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="skeleton h-5 w-16 rounded-full" />
          <div className="skeleton h-4 w-24 rounded" />
        </div>
        <div className="skeleton h-6 w-full rounded" />
        <div className="skeleton h-6 w-3/4 rounded" />
        <div className="space-y-2">
          <div className="skeleton h-4 w-full rounded" />
          <div className="skeleton h-4 w-full rounded" />
          <div className="skeleton h-4 w-2/3 rounded" />
        </div>
        <div className="flex items-center gap-2 pt-2">
          <div className="skeleton h-8 w-24 rounded-lg" />
          <div className="skeleton h-8 w-32 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function NewsListSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <NewsCardSkeleton key={i} />
      ))}
    </div>
  );
}
