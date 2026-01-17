import { isLocalMode } from './localMode';
import { summarizeTextLocal, analyzeSentimentLocal, processArticleLocal } from './aiApi.local';

export async function summarizeText(text) {
  if (!text || text.trim().length < 50) return text;
  return summarizeTextLocal(text);
}

export async function analyzeSentiment(text) {
  if (!text || text.trim().length < 10) return { label: 'neutral', score: 0.5 };
  return analyzeSentimentLocal(text);
}

export async function processArticle(title, description, content) {
  const fullText = `${title}. ${description}. ${content}`.trim();
  return processArticleLocal(title, description, content);
}
