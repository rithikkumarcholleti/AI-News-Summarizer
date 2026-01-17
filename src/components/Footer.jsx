/**
 * Footer Component
 * 
 * Simple footer with credits and links.
 */

import { Heart, Sparkles } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>AI-powered news analysis</span>
          </div>
          
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-destructive fill-destructive" />
            <span>Love</span>
          </div>
          
          <div className="text-xs">
            © {new Date().getFullYear()} AI News Summarizer
          </div>
        </div>
      </div>
    </footer>
  );
}
