import React from "react";
import { Bot, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ChatHeaderProps {
  bookCount: number;
}

export function ChatHeader({ bookCount }: ChatHeaderProps) {
  return (
    <div className="border-b bg-card px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Bot className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <h2 className="font-heading font-semibold text-base flex items-center gap-2">
            Book Assistant
            <Sparkles className="w-4 h-4 text-primary" />
          </h2>
          <p className="text-xs text-muted-foreground">
            Ask me about your recommendations
          </p>
        </div>
        <Badge variant="secondary" className="text-xs">
          {bookCount} {bookCount === 1 ? "book" : "books"}
        </Badge>
      </div>
    </div>
  );
}
