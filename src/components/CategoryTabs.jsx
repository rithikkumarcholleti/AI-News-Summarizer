/**
 * CategoryTabs Component
 * 
 * Displays category filter tabs/buttons for news categories.
 * Highlights the currently selected category.
 */

import { CATEGORIES } from '@/types/news';
import { cn } from '@/lib/utils';

export function CategoryTabs({ selectedCategory, onCategoryChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((category) => (
        <button
          key={category.value}
          onClick={() => onCategoryChange(category.value)}
          className={cn(
            "px-3 py-1.5 md:px-4 md:py-2 rounded-full text-sm font-medium transition-all duration-200",
            "flex items-center gap-1.5 border",
            selectedCategory === category.value
              ? "bg-primary text-primary-foreground border-primary shadow-md"
              : "bg-card text-muted-foreground border-border hover:bg-secondary hover:text-foreground hover:border-muted-foreground/30"
          )}
        >
          <span className="text-base">{category.icon}</span>
          <span className="hidden sm:inline">{category.label}</span>
        </button>
      ))}
    </div>
  );
}
