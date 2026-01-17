/**
 * Formats a date string into a readable format
 * @param {string|Date} dateString - ISO date string or Date object
 * @returns {string} Formatted date string like "12 Dec 2025, 10:30 AM"
 */
export function formatDate(dateString) {
  const date = new Date(dateString);
  
  if (isNaN(date.getTime())) {
    return 'Date unavailable';
  }
  
  const options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  };
  
  return date.toLocaleString('en-US', options);
}

/**
 * Returns relative time (e.g., "2 hours ago")
 * @param {string|Date} dateString
 * @returns {string}
 */
export function getRelativeTime(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} min ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return formatDate(dateString);
}
