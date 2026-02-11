// Core data types
export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;

  // Recommendation metadata
  ageGroup: string[];      // ["5-7", "8-10", "11-13", "14-17"]
  interests: string[];     // ["Adventure", "Friendship", "Mystery", etc.]
  genres: string[];        // ["Fantasy", "Realistic Fiction", etc.]
  languages: string[];     // ["English", "Spanish", "Bilingual", etc.]

  // Additional metadata
  pageCount: number;
  publishedYear: number;
  description: string;

  // Optional external links
  amazonLink?: string;
  goodreadsRating?: number;
}

// Wizard state
export interface WizardData {
  name: string;
  ageGroup: string;
  interests: string[];
  genres: string[];
  language: string;
}

// Wizard steps
export type Step = 'name' | 'age' | 'interests' | 'genre' | 'language' | 'results';

export const STEPS: readonly Step[] = ['name', 'age', 'interests', 'genre', 'language', 'results'] as const;

export const STEP_TITLES: Record<Step, string> = {
  name: "What's your name?",
  age: "How old are you?",
  interests: "What interests you?",
  genre: "What genres do you like?",
  language: "What language?",
  results: "Your Book Recommendations"
};

// Option types for multi-select steps
export interface Option {
  value: string;
  label: string;
  icon?: string;
  description?: string;
}

// Recommendation result with score
export interface BookRecommendation {
  book: Book;
  score: number;
  matchReasons: string[];
}

// Age group options
export const AGE_GROUPS: readonly string[] = ['5-7', '8-10', '11-13', '14-17'] as const;

// Interest options
export const INTERESTS: readonly Option[] = [
  { value: 'adventure', label: 'Adventure', icon: 'compass' },
  { value: 'friendship', label: 'Friendship', icon: 'heart' },
  { value: 'mystery', label: 'Mystery', icon: 'search' },
  { value: 'magic', label: 'Magic', icon: 'sparkles' },
  { value: 'animals', label: 'Animals', icon: 'dog' },
  { value: 'sports', label: 'Sports', icon: 'trophy' },
  { value: 'science', label: 'Science', icon: 'flask-conical' },
  { value: 'history', label: 'History', icon: 'landmark' },
  { value: 'art', label: 'Art', icon: 'palette' },
  { value: 'nature', label: 'Nature', icon: 'tree-pine' },
] as const;

// Genre options
export const GENRES: readonly Option[] = [
  { value: 'fantasy', label: 'Fantasy', icon: 'wand' },
  { value: 'realistic-fiction', label: 'Realistic Fiction', icon: 'book-open' },
  { value: 'mystery-thriller', label: 'Mystery/Thriller', icon: 'lock-keyhole' },
  { value: 'historical-fiction', label: 'Historical Fiction', icon: 'scroll' },
  { value: 'science-fiction', label: 'Science Fiction', icon: 'rocket' },
  { value: 'adventure', label: 'Adventure', icon: 'map' },
  { value: 'graphic-novel', label: 'Graphic Novel', icon: 'book-image' },
  { value: 'poetry', label: 'Poetry', icon: 'feather' },
  { value: 'non-fiction', label: 'Non-Fiction', icon: 'graduation-cap' },
] as const;

// Language options
export const LANGUAGES: readonly Option[] = [
  { value: 'english', label: 'English', icon: 'globe' },
  { value: 'spanish', label: 'Spanish', icon: 'globe' },
  { value: 'bilingual', label: 'Bilingual', icon: 'languages' },
  { value: 'french', label: 'French', icon: 'globe' },
  { value: 'other', label: 'Other', icon: 'globe' },
] as const;
