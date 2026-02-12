import React, { useState, KeyboardEvent } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

const MAX_LENGTH = 500;

export function ChatInput({
  onSendMessage,
  disabled = false,
  placeholder = "Ask about the books...",
}: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    const trimmed = input.trim();
    if (trimmed && !disabled) {
      onSendMessage(trimmed);
      setInput("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const remainingChars = MAX_LENGTH - input.length;
  const isNearLimit = remainingChars < 50;

  return (
    <div className="space-y-2">
      <div className="relative">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value.slice(0, MAX_LENGTH))}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="min-h-[80px] pr-12 resize-none"
          maxLength={MAX_LENGTH}
        />
        <Button
          onClick={handleSend}
          disabled={disabled || !input.trim()}
          size="icon"
          className="absolute bottom-2 right-2 h-8 w-8"
          aria-label="Send message"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>

      {/* Character counter */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <p>Press Enter to send, Shift+Enter for new line</p>
        {isNearLimit && (
          <p className={remainingChars < 10 ? "text-destructive" : ""}>
            {remainingChars} characters left
          </p>
        )}
      </div>
    </div>
  );
}
