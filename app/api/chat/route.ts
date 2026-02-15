import { NextRequest } from "next/server";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { buildSystemPrompt } from "@/lib/ai/system-prompts";
import { ChatRequest } from "@/lib/types/chat";

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// Rate limiting map (in production, use Redis or similar)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10;

// Input validation
const MAX_MESSAGE_LENGTH = 500;

/**
 * Simple rate limiter based on IP address
 */
function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(identifier) || [];

  // Filter out timestamps outside the window
  const recentTimestamps = timestamps.filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW
  );

  if (recentTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return false; // Rate limit exceeded
  }

  // Add current timestamp
  recentTimestamps.push(now);
  rateLimitMap.set(identifier, recentTimestamps);

  return true;
}

/**
 * Sanitize user input to prevent prompt injection
 */
function sanitizeInput(input: string): string {
  // Remove excessive whitespace and newlines
  let sanitized = input.trim().replace(/\s+/g, " ");

  // Remove potential prompt injection attempts
  const dangerousPatterns = [
    /ignore previous instructions/gi,
    /disregard all/gi,
    /forget everything/gi,
    /new instructions:/gi,
    /system:/gi,
    /\[SYSTEM\]/gi,
  ];

  dangerousPatterns.forEach((pattern) => {
    sanitized = sanitized.replace(pattern, "");
  });

  return sanitized;
}

export async function POST(req: NextRequest) {
  try {
    // Check API key
    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is not configured");
      return new Response(
        JSON.stringify({ error: "AI service is not configured" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Get client identifier for rate limiting (IP address)
    const identifier =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      "unknown";

    // Check rate limit
    if (!checkRateLimit(identifier)) {
      return new Response(
        JSON.stringify({
          error: "Too many requests. Please wait a moment and try again.",
        }),
        {
          status: 429,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Parse request body
    const body: ChatRequest = await req.json();
    const { message, wizardData, recommendations, conversationHistory } = body;

    // Validate input
    if (!message || typeof message !== "string") {
      return new Response(
        JSON.stringify({ error: "Message is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      return new Response(
        JSON.stringify({
          error: `Message is too long. Maximum ${MAX_MESSAGE_LENGTH} characters.`,
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Sanitize user input
    const sanitizedMessage = sanitizeInput(message);

    if (!sanitizedMessage) {
      return new Response(
        JSON.stringify({ error: "Invalid message content" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Build system prompt with context
    const systemPrompt = buildSystemPrompt(wizardData, recommendations);

    // Initialize Gemini model
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 10244, // Allow complete responses (was 300 - too low!)
        topP: 0.9,
      },
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ],
    });

    // Build conversation history (keep last 20 messages for better context)
    const chatHistory = conversationHistory.slice(-20).map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    console.log(`💬 Using ${chatHistory.length} previous messages for context`);

    // Start chat with system prompt and history
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: systemPrompt }],
        },
        {
          role: "model",
          parts: [
            {
              text: `Perfect! I've got all ${recommendations.length} books here and I'm ready to help ${wizardData.name} find the perfect read! I know about their interests (${wizardData.interests.join(", ")}), favorite genres (${wizardData.genres.join(", ")}), and I can answer any questions about these carefully selected books. Let's find your next favorite story! 📚✨`,
            },
          ],
        },
        ...chatHistory,
      ],
    });

    // Send message and get streaming response
    console.log("🚀 Starting Gemini stream...");
    const result = await chat.sendMessageStream(sanitizedMessage);

    // Create readable stream for SSE
    const encoder = new TextEncoder();
    let totalChunks = 0;
    let totalLength = 0;

    const stream = new ReadableStream({
      async start(controller) {
        try {
          console.log("📡 Stream opened, waiting for chunks...");

          for await (const chunk of result.stream) {
            const text = chunk.text();

            if (text) {
              totalChunks++;
              totalLength += text.length;

              console.log(`📦 Chunk ${totalChunks}: ${text.length} chars - "${text.substring(0, 50)}..."`);

              // Send as Server-Sent Event
              const data = `data: ${JSON.stringify({ text })}\n\n`;
              controller.enqueue(encoder.encode(data));
            }
          }

          console.log(`✅ Stream complete! Sent ${totalChunks} chunks, ${totalLength} total characters`);

          // Send completion signal
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (error) {
          console.error("❌ Streaming error:", error);

          // Send error to client
          const errorData = `data: ${JSON.stringify({
            error: "Stream interrupted",
            details: error instanceof Error ? error.message : "Unknown error"
          })}\n\n`;
          controller.enqueue(encoder.encode(errorData));
          controller.error(error);
        }
      },
    });

    // Return streaming response with proper headers
    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        "Connection": "keep-alive",
        "X-Accel-Buffering": "no", // Disable nginx buffering
      },
    });
  } catch (error: unknown) {
    console.error("Chat API error:", error);

    // Don't expose internal error details to client
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";

    return new Response(
      JSON.stringify({
        error: "Failed to process your message. Please try again.",
        details: process.env.NODE_ENV === "development" ? errorMessage : undefined,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
