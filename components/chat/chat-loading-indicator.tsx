import React from "react";
import Image from "next/image";

export function ChatLoadingIndicator() {
  return (
    <div className="flex gap-3 mb-4">
      {/* Robot Avatar with pulse animation */}
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-secondary/30 to-accent/20 flex items-center justify-center animate-pulse">
        <Image
          src="/robot/AI_Robot_02_3d 1.png"
          alt="Robot thinking"
          width={32}
          height={32}
          className="object-contain animate-bounce"
        />
      </div>

      {/* Typing indicator with fun message */}
      <div className="px-4 py-3 rounded-lg bg-gradient-to-r from-muted to-muted/60">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground font-medium">Thinking</span>
          <div className="flex gap-1.5">
            <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce [animation-delay:-0.3s]" />
            <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce [animation-delay:-0.15s]" />
            <div className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
}
