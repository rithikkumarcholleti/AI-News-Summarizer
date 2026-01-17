const hasNewsApiKey = !!import.meta.env.VITE_NEWS_API_KEY;
const hasOpenAIKey = !!import.meta.env.VITE_OPENAI_API_KEY;

export const isLocalMode = !hasNewsApiKey; 
export const useRealAI = import.meta.env.VITE_USE_REAL_AI === 'true' && hasOpenAIKey;

export const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY || '';
export const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';

if (import.meta.env.DEV) {
  console.log('🔧 App Mode:', isLocalMode ? 'LOCAL (Mock News)' : 'CLOUD (Real News API)');
  console.log('🤖 AI Mode:', useRealAI ? 'OpenAI (Real)' : 'Mock (Simulated)');
}
