/**
 * SearchBar Component
 * 
 * Provides a search input with icon and clear button.
 * Calls onSearch callback when user submits or clears.
 */

import { useState, useCallback } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function SearchBar({ 
  onSearch, 
  placeholder = 'Search news...', 
  initialValue = '' 
}) {
  const [value, setValue] = useState(initialValue);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    onSearch(value.trim());
  }, [value, onSearch]);

  const handleClear = useCallback(() => {
    setValue('');
    onSearch('');
  }, [onSearch]);

  const handleChange = useCallback((e) => {
    setValue(e.target.value);
    // Trigger search on each keystroke for live filtering
    onSearch(e.target.value.trim());
  }, [onSearch]);

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <Input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="pl-10 pr-10 h-10 bg-secondary/50 border-border focus:bg-card transition-colors"
        />
        {value && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleClear}
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-muted"
          >
            <X className="w-4 h-4" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
      </div>
    </form>
  );
}
