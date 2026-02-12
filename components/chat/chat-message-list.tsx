import React, { useEffect, useRef } from "react";
import { ChatMessage as ChatMessageType } from "@/lib/types/chat";
import { ChatMessage } from "./chat-message";
import { ChatLoadingIndicator } from "./chat-loading-indicator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatMessageListProps {
  messages: ChatMessageType[];
  isLoading?: boolean;
}

export function ChatMessageList({ messages, isLoading = false }: ChatMessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <ScrollArea className="flex-1 h-full">
      <div className="space-y-4 p-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}

        {isLoading && <ChatLoadingIndicator />}

        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
}
