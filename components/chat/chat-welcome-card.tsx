import React from "react";
import { Card } from "@/components/ui/card";
import { MessageCircle } from "lucide-react";
import Image from "next/image";

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
      <div className="text-center space-y-3 py-8">
        <div className="w-24 h-24 mx-auto relative animate-in zoom-in duration-500">
          <Image
            src="/robot/AI_Robot_3d 1.png"
            alt="Book Buddy Robot"
            width={96}
            height={96}
            className="object-contain drop-shadow-xl"
          />
        </div>
        <h3 className="font-heading text-2xl font-bold text-foreground flex items-center justify-center gap-2">
          Hi {userName}!
          <span className="inline-block animate-bounce">👋</span>
        </h3>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
          I'm <span className="font-semibold text-primary">Book Buddy</span>, your friendly AI reading guide! 🤖✨
          <br />Ask me anything about your books!
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
              className="glass-card-strong p-3 cursor-pointer hover:border-primary hover:shadow-lg hover:scale-[1.02] transition-all duration-300 border-white/30"
              onClick={() => onSuggestedQuestion(question)}
            >
              <p className="text-sm text-foreground font-medium">{question}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
