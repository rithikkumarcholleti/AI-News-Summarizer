import { normalizeSentiment } from '@/utils/sentimentConfig';
// No real AI used yet – mock only

async function mockSummarize(text) {
  await new Promise(resolve => setTimeout(resolve, 500));
  if (!text || text.trim().length < 50) return text;
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 10);
  const summary = sentences.slice(0, 2).join('. ').trim();
  return summary ? summary + '.' : text.substring(0, 200) + '...';
}

async function mockAnalyzeSentiment(text) {
  await new Promise(resolve => setTimeout(resolve, 300));
  if (!text || text.trim().length < 10) return { label: 'neutral', score: 0.5 };
  
  const lowerText = text.toLowerCase();
  const positiveWords = ['breakthrough', 'success', 'growth', 'innovation', 'improve', 'positive', 'great'];
  const negativeWords = ['warning', 'crisis', 'decline', 'loss', 'threat', 'fail', 'negative'];
  
  let pos = 0, neg = 0;
  positiveWords.forEach(w => { if (lowerText.includes(w)) pos++; });
  negativeWords.forEach(w => { if (lowerText.includes(w)) neg++; });
  
  if (pos > neg) return { label: 'positive', score: 0.7 };
  if (neg > pos) return { label: 'negative', score: 0.7 };
  return { label: 'neutral', score: 0.5 };
}

export async function summarizeTextLocal(text) {
  if (!text || text.trim().length < 50) return text;
  return mockSummarize(text);
}

export async function analyzeSentimentLocal(text) {
  if (!text || text.trim().length < 10) return { label: 'neutral', score: 0.5 };
  return mockAnalyzeSentiment(text);
}

export async function processArticleLocal(title, description, content) {
  const fullText = `${title}. ${description}. ${content}`.trim();
  const [summary, sentimentResult] = await Promise.all([
    summarizeTextLocal(fullText),
    analyzeSentimentLocal(fullText)
  ]);
  return { summary, sentiment: sentimentResult.label, sentimentScore: sentimentResult.score };
}
