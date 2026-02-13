import React from "react";
import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

interface ChatHeaderProps {
  bookCount: number;
}

export function ChatHeader({ bookCount }: ChatHeaderProps) {
  return (
    <div className="border-b bg-gradient-to-r from-primary/5 via-secondary/10 to-accent/5 px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center p-1 relative overflow-hidden">
          <Image
            src="/robot/AI_Chat_3d 1.png"
            alt="AI Robot Assistant"
            width={48}
            height={48}
            className="object-contain drop-shadow-md"
          />
        </div>
        <div className="flex-1">
          <h2 className="font-heading font-bold text-base flex items-center gap-2">
            Book Buddy
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
          </h2>
          <p className="text-xs text-muted-foreground">
            Your friendly AI reading guide
          </p>
        </div>
        <Badge variant="secondary" className="text-xs font-semibold">
          {bookCount} {bookCount === 1 ? "book" : "books"}
        </Badge>
      </div>
    </div>
  );
}
