/**
 * ErrorMessage Component
 * 
 * Displays error messages with retry functionality.
 */

import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ErrorMessage({ 
  title = 'Something went wrong',
  message, 
  onRetry 
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center animate-fade-in">
      <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
        <AlertCircle className="w-8 h-8 text-destructive" />
      </div>
      <h3 className="font-headline text-lg font-semibold text-foreground mb-2">
        {title}
      </h3>
      <p className="text-muted-foreground text-sm max-w-md mb-6">
        {message}
      </p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" className="gap-2">
          <RefreshCw className="w-4 h-4" />
          Try Again
        </Button>
      )}
    </div>
  );
}

/**
 * EmptyState Component
 * 
 * Displays when no results are found.
 */
export function EmptyState({ query }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center animate-fade-in">
      <div className="text-6xl mb-4">🔍</div>
      <h3 className="font-headline text-lg font-semibold text-foreground mb-2">
        No results found
      </h3>
      <p className="text-muted-foreground text-sm max-w-md">
        {query 
          ? `We couldn't find any news matching "${query}". Try a different search term.`
          : "No news articles available at the moment. Please try again later."
        }
      </p>
    </div>
  );
}
