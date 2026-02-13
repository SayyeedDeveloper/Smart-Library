import React from "react";
import { ChatMessage as ChatMessageType } from "@/lib/types/chat";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex gap-3 mb-4 animate-in fade-in slide-in-from-bottom-2 duration-300",
        isUser ? "flex-row-reverse" : "flex-row"
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
          isUser ? "bg-gradient-to-br from-primary to-primary/80 shadow-sm" : "bg-gradient-to-br from-secondary/30 to-accent/20"
        )}
      >
        {isUser ? (
          <User className="w-5 h-5 text-white" />
        ) : (
          <Image
            src="/robot/AI_Chat_02_3d 1.png"
            alt="Robot"
            width={32}
            height={32}
            className="object-contain"
          />
        )}
      </div>

      {/* Message content */}
      <div
        className={cn(
          "flex-1 px-4 py-3 rounded-lg max-w-[85%]",
          isUser
            ? "bg-primary text-white ml-auto"
            : "bg-muted text-foreground mr-auto"
        )}
      >
        <div
          className={cn(
            "text-sm prose prose-sm max-w-none",
            isUser
              ? "prose-invert prose-p:text-white prose-strong:text-white"
              : "prose-p:text-foreground prose-strong:text-foreground"
          )}
        >
          {isUser ? (
            <p className="m-0">{message.content}</p>
          ) : (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ children }) => <p className="m-0 mb-2 last:mb-0">{children}</p>,
                strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                ul: ({ children }) => <ul className="my-2 ml-4">{children}</ul>,
                ol: ({ children }) => <ol className="my-2 ml-4">{children}</ol>,
                li: ({ children }) => <li className="mb-1">{children}</li>,
              }}
            >
              {message.content}
            </ReactMarkdown>
          )}
        </div>
      </div>
    </div>
  );
}
