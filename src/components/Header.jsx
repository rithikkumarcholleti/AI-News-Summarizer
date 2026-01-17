/**
 * Header Component
 * 
 * Displays the app title, subtitle, and branding.
 * Features a gradient text effect and subtle animation.
 */

import { Newspaper, Sparkles } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 md:py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg">
                <Newspaper className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-sentiment-positive rounded-full flex items-center justify-center">
                <Sparkles className="w-2.5 h-2.5 text-sentiment-positive-foreground" />
              </div>
            </div>
            <div>
              <h1 className="font-headline text-xl md:text-2xl lg:text-3xl font-bold text-foreground tracking-tight">
                AI News Summarizer
              </h1>
              <p className="text-xs md:text-sm text-muted-foreground font-body">
                Smart summaries and sentiment insights powered by AI
              </p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary rounded-full">
              <div className="w-2 h-2 rounded-full bg-sentiment-positive animate-pulse" />
              <span>Live Updates</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
