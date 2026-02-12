import { useState, useCallback, useEffect } from "react";
import { ChatMessage } from "@/lib/types/chat";
import { WizardData, BookRecommendation } from "@/types";

const CHAT_STORAGE_KEY = "smart-lib-chat";

interface UseChatOptions {
  wizardData: WizardData;
  recommendations: BookRecommendation[];
}

export function useChat({ wizardData, recommendations }: UseChatOptions) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load chat history from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(CHAT_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setMessages(parsed.messages || []);
      } catch (err) {
        console.error("Failed to load chat history:", err);
      }
    }
  }, []);

  // Save chat history to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify({ messages }));
    }
  }, [messages]);

  // Send a message to the AI
  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return;

      // Create user message
      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: "user",
        content: content.trim(),
        timestamp: Date.now(),
      };

      // Add user message to chat
      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      setError(null);

      try {
        // Prepare recommendations in a simplified format
        const simplifiedRecommendations = recommendations.map((rec) => ({
          book: {
            title: rec.book.title,
            author: rec.book.author,
            description: rec.book.description,
            ageGroup: rec.book.ageGroup,
            interests: rec.book.interests,
            genres: rec.book.genres,
            pageCount: rec.book.pageCount,
            publishedYear: rec.book.publishedYear,
          },
          score: rec.score,
          matchReasons: rec.matchReasons,
        }));

        // Call API with full conversation history (loaded from localStorage)
        console.log(`📤 Sending message with ${messages.length} previous messages in history`);

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: content.trim(),
            wizardData,
            recommendations: simplifiedRecommendations,
            conversationHistory: messages, // Includes full history from localStorage
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to get response");
        }

        // Handle streaming response
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        if (!reader) {
          throw new Error("No response stream");
        }

        let assistantContent = "";
        const assistantMessageId = `assistant-${Date.now()}`;

        // Create initial assistant message
        const assistantMessage: ChatMessage = {
          id: assistantMessageId,
          role: "assistant",
          content: "",
          timestamp: Date.now(),
        };

        setMessages((prev) => [...prev, assistantMessage]);

        // Read and process SSE stream
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              console.log("✅ Stream completed successfully");
              break;
            }

            const chunk = decoder.decode(value, { stream: true });
            const lines = chunk.split("\n");

            for (const line of lines) {
              const trimmedLine = line.trim();

              if (trimmedLine.startsWith("data: ")) {
                const data = trimmedLine.slice(6).trim();

                if (data === "[DONE]") {
                  console.log("✅ Received [DONE] signal");
                  break;
                }

                if (!data) continue; // Skip empty data

                try {
                  const parsed = JSON.parse(data);
                  if (parsed.text) {
                    assistantContent += parsed.text;

                    // Update assistant message with accumulated content
                    setMessages((prev) =>
                      prev.map((msg) =>
                        msg.id === assistantMessageId
                          ? { ...msg, content: assistantContent }
                          : msg
                      )
                    );
                  }
                } catch (parseErr) {
                  // Skip malformed JSON chunks (can happen with chunked transfer)
                  console.warn("Skipping malformed SSE data:", data.substring(0, 50));
                }
              }
            }
          }
        } catch (streamErr) {
          console.error("Stream reading error:", streamErr);
          throw new Error("Failed to read AI response stream");
        } finally {
          reader.releaseLock();
        }

        // Ensure we have content before finishing
        if (!assistantContent.trim()) {
          throw new Error("AI response was empty");
        }

        console.log(`✅ Received ${assistantContent.length} characters from AI`);
        setIsLoading(false);
      } catch (err) {
        console.error("Chat error:", err);
        setError(err instanceof Error ? err.message : "Failed to send message");
        setIsLoading(false);

        // Remove the user message if there was an error
        setMessages((prev) => prev.filter((msg) => msg.id !== userMessage.id));
      }
    },
    [wizardData, recommendations, messages, isLoading]
  );

  // Clear chat history
  const clearChat = useCallback(() => {
    setMessages([]);
    localStorage.removeItem(CHAT_STORAGE_KEY);
  }, []);

  // Retry last message (in case of error)
  const retryLastMessage = useCallback(() => {
    if (messages.length > 0) {
      const lastUserMessage = messages
        .slice()
        .reverse()
        .find((msg) => msg.role === "user");

      if (lastUserMessage) {
        // Remove failed assistant message if any
        setMessages((prev) =>
          prev.filter(
            (msg) => msg.timestamp > lastUserMessage.timestamp && msg.role === "assistant"
              ? false
              : true
          )
        );

        sendMessage(lastUserMessage.content);
      }
    }
  }, [messages, sendMessage]);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat,
    retryLastMessage,
  };
}
