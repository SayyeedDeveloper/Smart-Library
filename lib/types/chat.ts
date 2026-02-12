// Chat message types
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

// Chat state interface
export interface ChatState {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
}

// Simplified book type for API communication
export interface SimplifiedBook {
  title: string;
  author: string;
  description: string;
  ageGroup: string[];
  interests: string[];
  genres: string[];
  pageCount: number;
  publishedYear: number;
}

// Simplified recommendation for API
export interface SimplifiedRecommendation {
  book: SimplifiedBook;
  score: number;
  matchReasons: string[];
}

// API request/response types
export interface ChatRequest {
  message: string;
  wizardData: {
    name: string;
    ageGroup: string;
    interests: string[];
    genres: string[];
    language: string;
  };
  recommendations: SimplifiedRecommendation[];
  conversationHistory: ChatMessage[];
}

export interface ChatResponse {
  message: string;
  error?: string;
}
