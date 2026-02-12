import React from "react";
import { Bot } from "lucide-react";

export function ChatLoadingIndicator() {
  return (
    <div className="flex gap-3 mb-4">
      {/* Avatar */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
        <Bot className="w-5 h-5 text-foreground" />
      </div>

      {/* Typing indicator */}
      <div className="px-4 py-3 rounded-lg bg-muted">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce [animation-delay:-0.3s]" />
          <div className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce [animation-delay:-0.15s]" />
          <div className="w-2 h-2 rounded-full bg-foreground/40 animate-bounce" />
        </div>
      </div>
    </div>
  );
}
