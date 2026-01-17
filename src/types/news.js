/**
 * Type definitions for news articles and API responses
 * (JavaScript version - using JSDoc for documentation)
 */

/**
 * @typedef {Object} NewsArticle
 * @property {string} id
 * @property {string} title
 * @property {string} description
 * @property {string} content
 * @property {string} url
 * @property {string|null} urlToImage
 * @property {string} publishedAt
 * @property {{id: string|null, name: string}} source
 * @property {string|null} author
 */

/**
 * @typedef {NewsArticle & {
 *   summary?: string,
 *   sentiment?: 'positive'|'neutral'|'negative',
 *   sentimentScore?: number,
 *   isProcessing?: boolean,
 *   processingError?: string,
 *   showSummary?: boolean
 * }} ProcessedArticle
 */

/**
 * @typedef {Object} NewsAPIResponse
 * @property {string} status
 * @property {number} totalResults
 * @property {NewsArticle[]} articles
 */

/**
 * @typedef {'general'|'technology'|'business'|'sports'|'health'|'entertainment'|'science'} NewsCategory
 */

export const CATEGORIES = [
  { value: 'general', label: 'All', icon: '📰' },
  { value: 'technology', label: 'Technology', icon: '💻' },
  { value: 'business', label: 'Business', icon: '💼' },
  { value: 'sports', label: 'Sports', icon: '⚽' },
  { value: 'health', label: 'Health', icon: '🏥' },
  { value: 'entertainment', label: 'Entertainment', icon: '🎬' },
  { value: 'science', label: 'Science', icon: '🔬' },
];
