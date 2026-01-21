export function SkeletonNewsCard() {
  return (
    <div className="animate-pulse bg-card rounded-xl border p-4 space-y-3">
      <div className="h-40 bg-muted rounded" />
      <div className="h-4 bg-muted rounded w-3/4" />
      <div className="h-3 bg-muted rounded w-full" />
      <div className="h-3 bg-muted rounded w-5/6" />
      <div className="h-8 bg-muted rounded w-1/3 mt-2" />
    </div>
  );
}
