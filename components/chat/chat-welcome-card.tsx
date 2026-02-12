import React from "react";
import { Card } from "@/components/ui/card";
import { Sparkles, MessageCircle } from "lucide-react";

interface ChatWelcomeCardProps {
  userName: string;
  onSuggestedQuestion: (question: string) => void;
}

const SUGGESTED_QUESTIONS = [
  "Which book should I start with?",
  "What's the shortest book?",
  "Tell me about the first book",
  "Which book is the most exciting?",
];

export function ChatWelcomeCard({ userName, onSuggestedQuestion }: ChatWelcomeCardProps) {
  return (
    <div className="space-y-4 px-4 pb-4">
      {/* Welcome message */}
      <div className="text-center space-y-2 py-8">
        <div className="flex items-center justify-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          <h3 className="font-heading text-lg font-semibold">
            Ask About Your Books
          </h3>
        </div>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          Hi {userName}! I'm here to help you explore your book recommendations.
          Ask me anything!
        </p>
      </div>

      {/* Suggested questions */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
          <MessageCircle className="w-3 h-3" />
          Try asking:
        </p>
        <div className="grid gap-2">
          {SUGGESTED_QUESTIONS.map((question) => (
            <Card
              key={question}
              className="p-3 cursor-pointer hover:bg-primary/5 hover:border-primary transition-colors"
              onClick={() => onSuggestedQuestion(question)}
            >
              <p className="text-sm text-foreground">{question}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
