import { normalizeSentiment } from "@/utils/sentimentConfig";

// Mock summary
async function mockSummarize(text) {
  await new Promise((r) => setTimeout(r, 500));
  if (!text || text.trim().length < 50) return text;
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 10);
  const summary = sentences.slice(0, 2).join(". ").trim();
  return summary ? summary + "." : text.substring(0, 200) + "...";
}

// Mock sentiment
async function mockAnalyzeSentiment(text) {
  await new Promise((r) => setTimeout(r, 300));
  if (!text || text.trim().length < 10) return { label: "neutral", score: 0.5 };

  const lowerText = text.toLowerCase();
  const positiveWords = ["breakthrough", "success", "growth", "innovation", "improve", "positive", "great"];
  const negativeWords = ["warning", "crisis", "decline", "loss", "threat", "fail", "negative"];

  let pos = 0, neg = 0;
  positiveWords.forEach((w) => lowerText.includes(w) && pos++);
  negativeWords.forEach((w) => lowerText.includes(w) && neg++);

  if (pos > neg) return { label: "positive", score: 0.7 };
  if (neg > pos) return { label: "negative", score: 0.7 };
  return { label: "neutral", score: 0.5 };
}

export async function summarizeTextLocal(text) {
  try {
    if (!text || text.trim().length < 50) return text;
    return await mockSummarize(text);
  } catch {
    return text.substring(0, 150) + "...";
  }
}

export async function analyzeSentimentLocal(text) {
  try {
    if (!text || text.trim().length < 10) return { label: "neutral", score: 0.5 };
    return await mockAnalyzeSentiment(text);
  } catch {
    return { label: "neutral", score: 0.5 };
  }
}

export async function processArticleLocal(title, description, content) {
  try {
    const fullText = `${title}. ${description}. ${content}`.trim();
    const [summary, sentimentResult] = await Promise.all([
      summarizeTextLocal(fullText),
      analyzeSentimentLocal(fullText),
    ]);
    return { summary, sentiment: sentimentResult.label, sentimentScore: sentimentResult.score };
  } catch {
    return { summary: description || "", sentiment: "neutral", sentimentScore: 0.5 };
  }
}
