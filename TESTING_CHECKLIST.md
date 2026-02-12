# AI Chat Integration - Testing Checklist

## ✅ Pre-Testing Setup

- [x] Dependencies installed (`npm install` complete)
- [x] Gemini API key configured in `.env.local`
- [x] TypeScript compilation successful (no errors)
- [ ] Development server running (`npm run dev`)

## 🧪 Functional Testing

### 1. Basic Chat Functionality

Navigate to the wizard and complete all steps to reach the results page.

- [ ] **Chat appears on results page**
  - Desktop: Chat sidebar visible on right side
  - Mobile: "Ask AI" tab visible

- [ ] **Welcome card displays**
  - Shows personalized greeting with user's name
  - Shows 4 suggested questions
  - Clicking a suggestion sends the message

- [ ] **Send a message**
  - Type a message in input field
  - Click send button (or press Enter)
  - Message appears in chat as user bubble

- [ ] **AI responds**
  - Loading indicator (three dots) appears
  - AI response streams in progressively
  - Response appears in AI bubble on left side

- [ ] **Chat history persists**
  - Send several messages
  - Refresh the page
  - Messages are still visible

### 2. Responsive Layout

#### Desktop (≥1024px)
- [ ] Books and chat side-by-side
- [ ] Chat takes ~40% width
- [ ] Chat is sticky (stays visible while scrolling books)
- [ ] Books take ~60% width
- [ ] Layout looks balanced

#### Mobile (<1024px)
- [ ] Tabs visible: "Recommendations" and "Ask AI"
- [ ] Clicking "Recommendations" shows book list
- [ ] Clicking "Ask AI" shows chat interface
- [ ] Chat fills the screen in tab view
- [ ] Tabs switch smoothly

### 3. Input Validation

- [ ] **Empty message** - Send button disabled
- [ ] **Character counter** - Appears when approaching 500 chars
- [ ] **Max length** - Cannot type more than 500 characters
- [ ] **Trimming** - Leading/trailing spaces removed
- [ ] **Keyboard shortcuts**:
  - Enter sends message
  - Shift+Enter creates new line

### 4. AI Context Awareness

Send these test messages and verify AI knows the context:

- [ ] "What's my name?" → AI uses your actual name
- [ ] "What age am I?" → AI mentions your selected age group
- [ ] "What are my interests?" → AI lists your selected interests
- [ ] "Tell me about [first book title]" → AI describes that specific book
- [ ] "Which book is shortest?" → AI identifies the book with lowest page count
- [ ] "What's the newest book?" → AI identifies most recent published year

### 5. Error Handling

- [ ] **Network error simulation**:
  - Disconnect internet
  - Send a message
  - Error message appears
  - "Retry" button visible
  - Click retry (reconnect first)
  - Message sends successfully

- [ ] **Rate limiting**:
  - Send 11 messages quickly (within 60 seconds)
  - 11th message should show rate limit error
  - Wait 60 seconds
  - Try again - should work

### 6. Loading States

- [ ] Typing indicator shows while AI is generating
- [ ] Send button disabled while loading
- [ ] Input field disabled while loading
- [ ] Loading state clears when response completes

### 7. Message Rendering

- [ ] **User messages**:
  - Right-aligned
  - Primary blue background
  - White text
  - Avatar icon on right

- [ ] **AI messages**:
  - Left-aligned
  - Light gray background
  - Dark text
  - Bot icon on left

- [ ] **Markdown formatting** (if AI uses it):
  - **Bold text** renders correctly
  - Bullet lists format properly
  - Line breaks work

### 8. Chat Header

- [ ] Shows "Book Assistant" title
- [ ] Shows sparkle icon
- [ ] Shows book count badge
- [ ] Badge updates if filters change recommendations

### 9. State Management

- [ ] **Wizard integration**:
  - Complete wizard
  - Reach results
  - Chat works
  - Click "Back" button
  - Return to results
  - Chat history preserved

- [ ] **Start Over**:
  - Complete wizard with chat messages
  - Click "Start Over" button
  - Wizard resets to step 1
  - Complete wizard again
  - Reach results
  - Chat history is cleared (fresh start)

### 10. Edge Cases

- [ ] **No recommendations** (if possible to trigger):
  - Remove all filters
  - Chat still appears
  - Chat still functional

- [ ] **Single recommendation**:
  - Filter to get only 1 book
  - Badge shows "1 book"
  - AI can discuss the single book

- [ ] **Many recommendations**:
  - Get 10+ recommendations
  - AI focuses on top matches
  - Can discuss any book in list

## 🎨 Visual Polish

### Design Consistency

- [ ] Colors match existing theme (blue primary)
- [ ] Fonts match (Inter for body, Nunito for headings)
- [ ] Border radius consistent (12px)
- [ ] Spacing rhythm consistent
- [ ] Animations smooth (fade-in, slide-in)

### Accessibility

- [ ] **Keyboard navigation**:
  - Tab through all elements
  - Can send message with Enter
  - Focus indicators visible

- [ ] **Screen reader** (if available):
  - Elements have proper labels
  - Messages announced
  - Buttons have descriptive text

- [ ] **Color contrast**:
  - Text readable on backgrounds
  - Buttons clearly visible
  - No contrast issues

## 🔒 Security Verification

- [ ] **API key not exposed**:
  - Open browser DevTools → Network tab
  - Send a chat message
  - Check request headers/body
  - API key should NOT be visible

- [ ] **Environment variables**:
  - Check `.env.local` is in `.gitignore`
  - API key not in git history

- [ ] **Rate limiting works** (tested above)

- [ ] **Input sanitization**:
  - Try message with HTML: `<script>alert('test')</script>`
  - Should not execute as script
  - Appears as plain text in response

## 📱 Cross-Browser Testing

### Desktop Browsers
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Edge (latest)
- [ ] Safari (if on Mac)

### Mobile Browsers
- [ ] Chrome Mobile
- [ ] Safari Mobile (iOS)
- [ ] Samsung Internet (Android)

## 📊 Performance Testing

- [ ] **Initial load**:
  - Chat components load quickly
  - No noticeable delay

- [ ] **Streaming**:
  - Text appears progressively
  - No long waits for full response
  - Smooth animation

- [ ] **Message scroll**:
  - Auto-scrolls to new messages
  - Smooth scrolling
  - No janky animations

- [ ] **Memory**:
  - Send 20+ messages
  - Check browser task manager
  - No memory leaks

## 🐛 Known Issues

Document any issues found:

```
Issue:
Steps to reproduce:
Expected behavior:
Actual behavior:
Browser/Device:
```

## ✨ Success Criteria

All tests passing means:
- ✅ Chat integration is complete
- ✅ Responsive design works
- ✅ AI is context-aware
- ✅ Security is maintained
- ✅ Performance is good
- ✅ Ready for production!

## 📝 Notes

Add any observations or suggestions:

```
[Your notes here]
```

---

**Testing completed by:** _______________
**Date:** _______________
**Time spent:** _______________
**Issues found:** _______________
**Overall rating:** ⭐⭐⭐⭐⭐
