"use client";

import React from "react";
import { useChat } from "@/lib/hooks/use-chat";
import { WizardData, BookRecommendation } from "@/types";
import { ChatHeader } from "./chat-header";
import { ChatMessageList } from "./chat-message-list";
import { ChatInput } from "./chat-input";
import { ChatWelcomeCard } from "./chat-welcome-card";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ChatContainerProps {
  wizardData: WizardData;
  recommendations: BookRecommendation[];
}

export function ChatContainer({ wizardData, recommendations }: ChatContainerProps) {
  const { messages, isLoading, error, sendMessage, retryLastMessage } = useChat({
    wizardData,
    recommendations,
  });

  const hasMessages = messages.length > 0;

  return (
    <div className="flex flex-col h-full bg-transparent">
      {/* Header - Fixed */}
      <div className="flex-shrink-0">
        <ChatHeader bookCount={recommendations.length} />
      </div>

      {/* Messages area - Scrollable */}
      <div className="flex-1 min-h-0 overflow-hidden">
        {!hasMessages && !isLoading ? (
          <div className="h-full overflow-y-auto">
            <ChatWelcomeCard userName={wizardData.name} onSuggestedQuestion={sendMessage} />
          </div>
        ) : (
          <div className="h-full">
            <ChatMessageList messages={messages} isLoading={isLoading} />
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <div className="flex-shrink-0 px-4 pb-2">
          <Card className="bg-destructive/10 border-destructive/20 p-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-destructive font-medium">Error</p>
                <p className="text-xs text-destructive/80 truncate">{error}</p>
              </div>
              <Button
                onClick={retryLastMessage}
                size="sm"
                variant="outline"
                className="h-7 text-xs flex-shrink-0"
              >
                <RefreshCw className="w-3 h-3 mr-1" />
                Retry
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Input area - Fixed at bottom */}
      <div className="flex-shrink-0 border-t border-white/20 glass-card-subtle p-4">
        <ChatInput
          onSendMessage={sendMessage}
          disabled={isLoading}
          placeholder="Ask about the books..."
        />
      </div>
    </div>
  );
}
