/**
 * ToggleSwitch Component
 * 
 * A toggle switch for switching between original and summary content.
 */

import { cn } from '@/lib/utils';

export function ToggleSwitch({
  isOn,
  onToggle,
  labelOff = 'Original',
  labelOn = 'Summary',
  disabled = false,
  loading = false
}) {
  return (
    <button
      onClick={onToggle}
      disabled={disabled || loading}
      className={cn(
        "relative inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all",
        "border focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        disabled && "opacity-50 cursor-not-allowed",
        loading && "animate-pulse",
        isOn 
          ? "bg-primary text-primary-foreground border-primary" 
          : "bg-secondary text-secondary-foreground border-border hover:bg-muted"
      )}
    >
      <span className={cn(
        "transition-opacity",
        isOn ? "opacity-50" : "opacity-100"
      )}>
        {labelOff}
      </span>
      <div className={cn(
        "w-8 h-4 rounded-full relative transition-colors",
        isOn ? "bg-primary-foreground/30" : "bg-muted-foreground/30"
      )}>
        <div className={cn(
          "absolute w-3 h-3 rounded-full top-0.5 transition-all",
          isOn 
            ? "left-4 bg-primary-foreground" 
            : "left-0.5 bg-muted-foreground"
        )} />
      </div>
      <span className={cn(
        "transition-opacity",
        isOn ? "opacity-100" : "opacity-50"
      )}>
        {labelOn}
      </span>
    </button>
  );
}
