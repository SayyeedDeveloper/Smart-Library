import { Book, WizardData, BookRecommendation } from "@/types";
import { BOOKS } from "./data/books";

/**
 * Calculate the intersection of two arrays
 */
function intersection<T>(arr1: T[], arr2: T[]): T[] {
  return arr1.filter(item => arr2.includes(item));
}

/**
 * Calculate a recommendation score for a book based on user preferences
 *
 * Scoring logic:
 * - Age group match (mandatory filter - returns 0 if not matched)
 * - Language match (mandatory filter - returns 0 if not matched)
 * - Genre overlap: 3 points per match (highest weight)
 * - Interest overlap: 2 points per match
 *
 * @param book The book to score
 * @param prefs User preferences from the wizard
 * @returns Score (0 = no match, higher = better match)
 */
function calculateBookScore(book: Book, prefs: WizardData): { score: number; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];

  // Age group filter (mandatory)
  if (!book.ageGroup.includes(prefs.ageGroup)) {
    return { score: 0, reasons: [] };
  }

  // Language filter (mandatory)
  if (!book.languages.includes(prefs.language)) {
    return { score: 0, reasons: [] };
  }

  // Genre matching (highest weight: 3 points per match)
  if (prefs.genres.length > 0) {
    const genreMatches = intersection(book.genres, prefs.genres);
    const genreScore = genreMatches.length * 3;
    score += genreScore;

    if (genreMatches.length > 0) {
      reasons.push(`Matches your interest in ${genreMatches.join(', ')}`);
    }
  }

  // Interest matching (2 points per match)
  if (prefs.interests.length > 0) {
    const interestMatches = intersection(book.interests, prefs.interests);
    const interestScore = interestMatches.length * 2;
    score += interestScore;

    if (interestMatches.length > 0) {
      reasons.push(`Features ${interestMatches.join(', ')} themes`);
    }
  }

  // Add age-appropriate note
  reasons.push(`Perfect for ages ${book.ageGroup.join(', ')}`);

  return { score, reasons };
}

/**
 * Get book recommendations based on user preferences
 *
 * @param prefs User preferences from the wizard
 * @param limit Maximum number of recommendations to return (default: 8)
 * @returns Array of book recommendations sorted by score
 */
export function getRecommendations(
  prefs: WizardData,
  limit: number = 8
): BookRecommendation[] {
  // Score all books
  const scoredBooks = BOOKS.map(book => {
    const { score, reasons } = calculateBookScore(book, prefs);
    return {
      book,
      score,
      matchReasons: reasons
    };
  });

  // Filter out books with score 0 (no match)
  const validMatches = scoredBooks.filter(item => item.score > 0);

  // Sort by score (descending) and limit results
  const topMatches = validMatches
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  // If we have matches, return them
  if (topMatches.length > 0) {
    return topMatches;
  }

  // Fallback: If no matches found, return age-appropriate popular books
  const fallbackBooks = BOOKS
    .filter(book => book.ageGroup.includes(prefs.ageGroup))
    .slice(0, limit)
    .map(book => ({
      book,
      score: 0,
      matchReasons: [
        `Age-appropriate for ${prefs.ageGroup} year olds`,
        'Popular choice among readers'
      ]
    }));

  return fallbackBooks;
}

/**
 * Get a single random book from the dataset (for featured/spotlight)
 */
export function getRandomBook(): Book {
  const randomIndex = Math.floor(Math.random() * BOOKS.length);
  return BOOKS[randomIndex];
}

/**
 * Get books by specific criteria (useful for "More like this" features)
 */
export function getBooksByGenre(genre: string, limit: number = 5): Book[] {
  return BOOKS
    .filter(book => book.genres.includes(genre))
    .slice(0, limit);
}

/**
 * Get books by age group
 */
export function getBooksByAgeGroup(ageGroup: string, limit: number = 5): Book[] {
  return BOOKS
    .filter(book => book.ageGroup.includes(ageGroup))
    .slice(0, limit);
}
