/**
 * Sentiment configuration for colors and labels
 */

export const sentimentConfig = {
  positive: {
    label: 'Positive',
    icon: '👍',
    description: 'Positive Outlook'
  },
  neutral: {
    label: 'Neutral',
    icon: '😐',
    description: 'Neutral Tone'
  },
  negative: {
    label: 'Negative',
    icon: '⚠️',
    description: 'Concerning'
  }
};

/**
 * Normalizes various sentiment labels to our standard types
 * @param {string} label
 * @returns {'positive'|'neutral'|'negative'}
 */
export function normalizeSentiment(label) {
  const normalized = label.toLowerCase().trim();
  
  if (['positive', 'pos', 'good', 'bullish', '5 stars', '4 stars'].includes(normalized)) {
    return 'positive';
  }
  
  if (['negative', 'neg', 'bad', 'bearish', '1 star', '2 stars'].includes(normalized)) {
    return 'negative';
  }
  
  return 'neutral';
}
