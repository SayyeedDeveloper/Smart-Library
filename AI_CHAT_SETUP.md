# AI Chat Integration - Setup Guide

## Overview

The Smart Library wizard now includes an AI chat assistant powered by Google Gemini 1.5 Flash. Users can ask questions about their recommended books and get personalized, age-appropriate guidance.

## Setup Instructions

### 1. Get Your Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### 2. Configure Environment Variables

1. Open the `.env.local` file in the project root
2. Replace `your_api_key_here` with your actual Gemini API key:

```bash
GEMINI_API_KEY=AIzaSy...your-actual-key-here
```

### 3. Restart Development Server

If the dev server is running, restart it to load the new environment variable:

```bash
npm run dev
```

## Features

### Desktop Experience (≥1024px)
- **Split Layout**: Books (60%) and chat sidebar (40%) side-by-side
- **Sticky Chat**: Chat remains visible while scrolling through books
- **Seamless Interaction**: Ask questions without leaving the recommendations view

### Mobile Experience (<1024px)
- **Tabbed Interface**: Switch between "Recommendations" and "Ask AI" tabs
- **Full-Screen Chat**: Dedicated space for AI conversations
- **Touch-Optimized**: Designed for mobile interaction

### AI Assistant Capabilities

The AI librarian can help with:
- **Book Selection**: "Which book should I start with?"
- **Comparisons**: "What's the difference between these two books?"
- **Details**: "How long is this book?" or "What's it about?"
- **Recommendations**: "Which book is most exciting?"
- **Context-Aware**: Knows the user's age, interests, and preferences

### Security Features

✅ **API Key Protection**: Never exposed to client-side code
✅ **Rate Limiting**: 10 requests per minute per IP
✅ **Input Validation**: Max 500 characters per message
✅ **Prompt Injection Prevention**: Sanitizes user input
✅ **Content Safety**: Gemini's built-in safety filters enabled

### Technical Details

**Backend:**
- Next.js API Route: `/api/chat/route.ts`
- Streaming responses via Server-Sent Events (SSE)
- Context-aware system prompts
- Conversation history management

**Frontend:**
- React hooks for state management
- localStorage persistence
- Markdown rendering for AI responses
- Real-time typing indicators

**Components:**
- `ChatContainer`: Main wrapper with error handling
- `ChatMessageList`: Scrollable message display
- `ChatInput`: Input with character limit
- `ChatWelcomeCard`: Suggested questions
- `ChatHeader`: Context indicator

## File Structure

```
smart-lib/
├── app/api/chat/
│   └── route.ts                 # Gemini API integration
├── lib/
│   ├── ai/
│   │   └── system-prompts.ts    # Context-aware prompts
│   ├── hooks/
│   │   └── use-chat.ts          # Chat state management
│   └── types/
│       └── chat.ts              # TypeScript types
├── components/chat/
│   ├── chat-container.tsx       # Main chat wrapper
│   ├── chat-header.tsx          # Header with context
│   ├── chat-message-list.tsx    # Message list
│   ├── chat-message.tsx         # Individual message
│   ├── chat-input.tsx           # Input with validation
│   ├── chat-loading-indicator.tsx # Typing animation
│   └── chat-welcome-card.tsx    # Suggested questions
└── .env.local                   # API key (not committed)
```

## Testing Checklist

- [ ] API key is configured correctly
- [ ] Chat appears on results page
- [ ] Desktop: Books and chat are side-by-side
- [ ] Mobile: Tabs switch between books and chat
- [ ] AI responds to messages
- [ ] Streaming works (text appears progressively)
- [ ] AI knows about user's profile and recommended books
- [ ] Error messages display correctly
- [ ] Rate limiting works (try 11+ requests quickly)
- [ ] Chat history persists on page refresh
- [ ] "Start Over" clears chat history

## Troubleshooting

### "AI service is not configured" Error
- Verify `GEMINI_API_KEY` is set in `.env.local`
- Restart the development server
- Check for typos in the environment variable name

### Rate Limit Errors
- Wait 60 seconds before sending more messages
- In production, consider using Redis for rate limiting

### Streaming Not Working
- Check browser console for errors
- Verify API endpoint is accessible at `/api/chat`
- Ensure no ad blockers are interfering

### Chat Not Appearing
- Verify you've completed the wizard and reached the results step
- Check that recommendations exist
- Open browser DevTools to check for errors

## API Costs

**Gemini 1.5 Flash Pricing (as of 2026):**
- Input: $0.00001875 per 1K tokens
- Output: $0.000075 per 1K tokens

**Estimated Costs:**
- Average chat message: ~200 tokens
- System prompt: ~500 tokens
- **Cost per interaction: ~$0.0001** (very affordable!)

With the 300 max output tokens limit, costs remain minimal even with heavy usage.

## Next Steps

1. **Custom Prompts**: Modify `lib/ai/system-prompts.ts` to adjust AI personality
2. **Extended Context**: Add more book metadata to recommendations
3. **Follow-up Questions**: Implement suggested follow-ups from AI
4. **Analytics**: Track popular questions to improve recommendations
5. **Multi-Language**: Support conversations in other languages

## Support

For issues or questions:
- Check the [Gemini API Documentation](https://ai.google.dev/docs)
- Review Next.js [Route Handlers](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- Open an issue in the project repository
