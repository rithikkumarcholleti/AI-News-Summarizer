# Running This Project Locally (Without Lovable Cloud)

This guide explains how to run this AI News Summarizer project completely locally in VS Code.

**Note:** This project has been converted to JavaScript (no TypeScript required).

## Prerequisites

1. **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
2. **npm** or **bun** package manager
3. **News API Key** - Get one free at [newsapi.org](https://newsapi.org/register)
4. **(Optional) OpenAI API Key** - For real AI summarization/sentiment, get one at [platform.openai.com](https://platform.openai.com/)

## Quick Start

### Step 1: Clone/Download the Project

```bash
# If you have the code in a git repo
git clone <your-repo-url>
cd ai-news-summarizer

# Or just copy all the files to a folder
```

### Step 2: Install Dependencies

```bash
npm install
# or
bun install
```

### Step 3: Create Environment File

Create a `.env.local` file in the project root:

```env
# Required: Your NewsAPI.org API key
VITE_NEWS_API_KEY=your_newsapi_key_here

# Optional: OpenAI API key for real AI features
# If not provided, mock AI will be used (simulated summarization/sentiment)
VITE_OPENAI_API_KEY=your_openai_key_here

# Set to 'true' to use real AI (requires VITE_OPENAI_API_KEY)
# Set to 'false' or omit to use mock AI (free, no API needed)
VITE_USE_REAL_AI=false
```

### Step 4: Run the Development Server

```bash
npm run dev
# or
bun dev
```

The app will be available at `http://localhost:5173`

## How It Works Locally

### News Fetching
- Calls NewsAPI.org directly from the browser using your `VITE_NEWS_API_KEY`
- Note: NewsAPI free tier only works on localhost, not on deployed sites

### AI Features (Two Modes)

#### Mock Mode (Default - Free, No API Key Required)
- Uses simple keyword-based sentiment analysis
- Creates extractive summaries from the first 2 sentences
- Great for development and testing

#### Real AI Mode (Requires OpenAI API Key)
- Set `VITE_USE_REAL_AI=true` in your `.env.local`
- Requires `VITE_OPENAI_API_KEY` to be set
- Uses GPT-3.5-turbo for summarization and sentiment analysis
- Provides more accurate results but incurs API costs

## Project Structure

```
src/
├── services/
│   ├── newsApi.local.js    # Direct NewsAPI calls (local mode)
│   ├── aiApi.local.js      # Mock + OpenAI AI services (local mode)
│   └── localMode.js        # Configuration for local vs cloud mode
├── hooks/
│   ├── useAIProcessing.js  # AI processing hook
│   └── useNewsFetcher.js   # News fetching hook
├── components/
│   └── *.jsx               # All React components
├── pages/
│   └── *.jsx               # Page components
└── utils/
    └── *.js                # Utility functions
```

## Troubleshooting

### "API key not valid" error
- Make sure your `.env.local` file is in the project root
- Restart the dev server after changing environment variables
- Check that your NewsAPI key is active

### News not loading
- NewsAPI free tier only works on localhost
- Check browser console for CORS errors
- Verify your API key at newsapi.org/account

### AI not working
- In mock mode: This is expected, it uses simple algorithms
- In real mode: Check your OpenAI API key and billing status

## Switching Back to Lovable Cloud

If you want to use Lovable Cloud features again:
1. Deploy the project on Lovable
2. The cloud services will automatically be used
3. No code changes needed - it detects the environment automatically
