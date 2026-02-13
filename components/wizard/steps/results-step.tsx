"use client";

import React, { useState } from "react";
import { useWizard } from "@/lib/wizard-context";
import { BookCard } from "@/components/shared/book-card";
import { FilterChips } from "@/components/shared/filter-chips";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChatContainer } from "@/components/chat/chat-container";
import { WizardProgress } from "@/components/wizard/wizard-progress";
import { Button } from "@/components/ui/button";
import { Sparkles, BookOpen, MessageCircle, ArrowLeft, RotateCcw } from "lucide-react";
import Image from "next/image";
import { WizardData, BookRecommendation } from "@/types";

type SortOption = "relevance" | "newest" | "shortest" | "longest";

// Books content component (reusable for both layouts)
interface BooksContentProps {
  wizardData: WizardData;
  recommendations: BookRecommendation[];
  sortBy: SortOption;
  onRemoveInterest: (interest: string) => void;
  onRemoveGenre: (genre: string) => void;
  onSortChange: (value: SortOption) => void;
}

function BooksContent({
  wizardData,
  recommendations,
  sortBy,
  onRemoveInterest,
  onRemoveGenre,
  onSortChange
}: BooksContentProps) {
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
    <div className="space-y-4">
      {/* Active Filters */}
      <FilterChips
        wizardData={wizardData}
        onRemoveInterest={onRemoveInterest}
        onRemoveGenre={onRemoveGenre}
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
            <Select value={sortBy} onValueChange={(value) => onSortChange(value as SortOption)}>
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

      {/* Book List */}
      <div className="space-y-4">
        {sortedRecommendations.length > 0 ? (
          sortedRecommendations.map((rec, index) => (
            <BookCard key={rec.book.id} recommendation={rec} index={index} />
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

export function ResultsStep() {
  const { wizardData, recommendations, updateField, completedSteps, currentStep, previousStep, resetWizard } = useWizard();
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const [activeTab, setActiveTab] = useState<string>("books");

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

  return (
    <div className="min-h-screen bg-background relative">
      {/* Floating decorative shapes - RESULTS PAGE */}
      <div className="pointer-events-none absolute -left-8 top-20 h-40 w-40 rounded-full bg-[#1d80dd]/35 blur-3xl" />
      <div className="pointer-events-none absolute -right-4 top-40 h-36 w-36 rounded-full bg-[#ff9f40]/40 blur-3xl" />
      <div className="pointer-events-none absolute left-1/4 top-96 h-32 w-32 rounded-full bg-[#f7d94c]/40 blur-2xl" />
      <div className="pointer-events-none absolute right-1/3 bottom-40 h-40 w-40 rounded-full bg-[#d85085]/35 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 bottom-20 h-28 w-28 rounded-full bg-[#1d80dd]/30 blur-2xl" />
      <div className="pointer-events-none absolute right-1/4 top-64 h-24 w-24 rounded-full bg-[#ff9f40]/35 blur-xl" />
      <div className="pointer-events-none absolute left-2/3 bottom-60 h-32 w-32 rounded-full bg-[#f7d94c]/35 blur-2xl" />
      <div className="pointer-events-none absolute -left-4 bottom-96 h-28 w-28 rounded-full bg-[#d85085]/40 blur-xl" />

      {/* Mobile/Tablet: Tabbed Interface (< 1024px) */}
      <div className="lg:hidden pb-24">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Progress Indicator */}
          <div className="py-6">
            <WizardProgress
              currentStep={currentStep}
              completedSteps={completedSteps}
            />
          </div>

          {/* Header with Robot - Glassmorphism */}
          <div className="glass-card rounded-2xl border border-white/20 text-center space-y-3 py-8 px-4 mb-6">
            <div className="flex items-center justify-center gap-4">
              <div className="hidden sm:block animate-in zoom-in duration-700">
                <Image
                  src="/robot/AI_Robot_03_3d 1.png"
                  alt="Success Robot"
                  width={64}
                  height={64}
                  className="object-contain drop-shadow-xl animate-bounce"
                  style={{ animationDuration: '2s' }}
                />
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-8 h-8 text-primary animate-pulse" />
                <h1 className="font-heading text-3xl font-bold text-foreground">
                  Your Book Recommendations! 🎉
                </h1>
              </div>
              <div className="hidden sm:block animate-in zoom-in duration-700 delay-150">
                <Image
                  src="/robot/AI_Chat_03_3d 1.png"
                  alt="Success Robot"
                  width={64}
                  height={64}
                  className="object-contain drop-shadow-xl animate-bounce"
                  style={{ animationDuration: '2s', animationDelay: '0.3s' }}
                />
              </div>
            </div>
            <p className="text-lg text-muted-foreground">
              {recommendations.length > 0
                ? `✨ We found ${recommendations.length} perfect ${recommendations.length === 1 ? 'book' : 'books'} for ${wizardData.name}! ✨`
                : `We couldn't find exact matches, but here are some great books for you!`}
            </p>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="books" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">Recommendations</span>
                <span className="sm:hidden">Books</span>
              </TabsTrigger>
              <TabsTrigger value="chat" className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                <span className="hidden sm:inline">Ask AI</span>
                <span className="sm:hidden">Chat</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="books" className="mt-0">
              <BooksContent
                wizardData={wizardData}
                recommendations={recommendations}
                sortBy={sortBy}
                onRemoveInterest={handleRemoveInterest}
                onRemoveGenre={handleRemoveGenre}
                onSortChange={setSortBy}
              />
            </TabsContent>

            <TabsContent value="chat" className="mt-0">
              <div className="h-[calc(100vh-320px)] min-h-[500px]">
                <ChatContainer wizardData={wizardData} recommendations={recommendations} />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Fixed Navigation at Bottom */}
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t shadow-lg z-20">
          <div className="container mx-auto px-4 py-4 max-w-5xl">
            <div className="flex items-center justify-between">
              <Button
                onClick={previousStep}
                variant="outline"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <Button
                onClick={resetWizard}
                variant="outline"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Start Over
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: Sidebar Layout (>= 1024px) */}
      <div className="hidden lg:block lg:min-h-screen">
        {/* Main Content Area - Scrollable with right padding for fixed chat */}
        <main className="pr-[480px]">
          <div className="container mx-auto px-8 py-12 max-w-5xl">
            {/* Progress Indicator */}
            <div className="mb-8">
              <WizardProgress
                currentStep={currentStep}
                completedSteps={completedSteps}
              />
            </div>

            {/* Header with Robots - Glassmorphism */}
            <div className="glass-card rounded-2xl border border-white/20 text-center space-y-4 mb-12 py-8 px-6">
              <div className="flex items-center justify-center gap-4">
                <div className="animate-in zoom-in duration-700">
                  <Image
                    src="/robot/AI_Robot_03_3d 1.png"
                    alt="Success Robot"
                    width={80}
                    height={80}
                    className="object-contain drop-shadow-xl animate-bounce"
                    style={{ animationDuration: '2s' }}
                  />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-10 h-10 text-primary animate-pulse" />
                    <h1 className="font-heading text-4xl font-bold text-foreground">
                      Your Books! 🎉
                    </h1>
                  </div>
                </div>
                <div className="animate-in zoom-in duration-700 delay-150">
                  <Image
                    src="/robot/AI_Chat_03_3d 1.png"
                    alt="Success Robot"
                    width={80}
                    height={80}
                    className="object-contain drop-shadow-xl animate-bounce"
                    style={{ animationDuration: '2s', animationDelay: '0.3s' }}
                  />
                </div>
              </div>
              <p className="text-lg text-muted-foreground">
                {recommendations.length > 0
                  ? `✨ We found ${recommendations.length} perfect ${recommendations.length === 1 ? 'book' : 'books'} for ${wizardData.name}! ✨`
                  : `We couldn't find exact matches, but here are some great books for you!`}
              </p>
            </div>

            {/* Books Content */}
            <BooksContent
              wizardData={wizardData}
              recommendations={recommendations}
              sortBy={sortBy}
              onRemoveInterest={handleRemoveInterest}
              onRemoveGenre={handleRemoveGenre}
              onSortChange={setSortBy}
            />

            {/* Navigation */}
            <div className="flex items-center justify-between pt-12 border-t mt-12">
              <Button
                onClick={previousStep}
                variant="outline"
                size="lg"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="text-center space-y-1 py-4">
                <p className="text-sm font-medium text-foreground">
                  Made with ❤️ by English teachers team
                </p>
                <p className="text-xs text-muted-foreground">
                  Andijan region, Khojaabad district, School №2
                </p>
              </div>
              <Button
                onClick={resetWizard}
                variant="outline"
                size="lg"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Start Over
              </Button>
            </div>
          </div>
        </main>

        {/* Chat Sidebar - Truly Fixed */}
        <aside className="fixed top-0 right-0 w-[480px] h-screen border-l border-white/20 glass-card-subtle flex flex-col">
          <ChatContainer wizardData={wizardData} recommendations={recommendations} />
        </aside>
      </div>
    </div>
  );
}
