"use client";

import React, { useState } from "react";
import { useWizard } from "@/lib/wizard-context";
import { BookCard } from "@/components/shared/book-card";
import { FilterChips } from "@/components/shared/filter-chips";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles } from "lucide-react";

type SortOption = "relevance" | "newest" | "shortest" | "longest";

export function ResultsStep() {
  const { wizardData, recommendations, updateField } = useWizard();
  const [sortBy, setSortBy] = useState<SortOption>("relevance");

  // Handle removing interest filter
  const handleRemoveInterest = (interest: string) => {
    const newInterests = wizardData.interests.filter(i => i !== interest);
    updateField("interests", newInterests);
  };

  // Handle removing genre filter
  const handleRemoveGenre = (genre: string) => {
    const newGenres = wizardData.genres.filter(g => g !== genre);
    updateField("genres", newGenres);
  };

  // Sort recommendations
  const sortedRecommendations = [...recommendations].sort((a, b) => {
    switch (sortBy) {
      case "relevance":
        return b.score - a.score;
      case "newest":
        return b.book.publishedYear - a.book.publishedYear;
      case "shortest":
        return a.book.pageCount - b.book.pageCount;
      case "longest":
        return b.book.pageCount - a.book.pageCount;
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="w-8 h-8 text-primary" />
          <h1 className="font-heading text-3xl font-bold text-foreground">
            Your Book Recommendations
          </h1>
        </div>
        <p className="text-muted-foreground">
          {recommendations.length > 0
            ? `We found ${recommendations.length} perfect ${recommendations.length === 1 ? 'book' : 'books'} for ${wizardData.name}!`
            : `We couldn't find exact matches, but here are some great books for you!`}
        </p>
      </div>

      {/* Filters & Sort */}
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Active Filters */}
        <FilterChips
          wizardData={wizardData}
          onRemoveInterest={handleRemoveInterest}
          onRemoveGenre={handleRemoveGenre}
        />

        {/* Sort Dropdown */}
        {recommendations.length > 1 && (
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-muted-foreground">
              {recommendations.length} {recommendations.length === 1 ? 'result' : 'results'}
            </p>
            <div className="flex items-center gap-2">
              <label htmlFor="sort" className="text-sm text-muted-foreground">
                Sort by:
              </label>
              <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                <SelectTrigger id="sort" className="w-[160px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Best Match</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="shortest">Shortest First</SelectItem>
                  <SelectItem value="longest">Longest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>

      {/* Book List */}
      <div className="max-w-4xl mx-auto space-y-4">
        {sortedRecommendations.length > 0 ? (
          sortedRecommendations.map((rec) => (
            <BookCard key={rec.book.id} recommendation={rec} />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No books found. Try adjusting your preferences!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
