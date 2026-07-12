import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";
import { NextRequest } from "next/server";
import { getAllPortfolioData, profile, projects, skills, experience } from "../../../data/portfolio";
import { EVIDENCE_REGISTRY, ACTION_REGISTRY, matchIntent } from "./intentMatcher";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

// --- Rate Limiting ---
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const MAX_REQUESTS = 20;
const WINDOW_MS = 60 * 60 * 1000;

function checkRateLimit(req: NextRequest): boolean {
  // Safe IP extraction
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";
  
  if (ip === "unknown") return true; // Cannot reliably rate limit if IP is unknown (e.g. serverless without x-forwarded-for)

  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_REQUESTS) return false;
  entry.count += 1;
  return true;
}

// --- Streaming Utility ---
function encodeEvent(type: string, data?: any) {
  return new TextEncoder().encode(JSON.stringify({ type, ...(data ? { data } : {}) }) + "\n");
}

export async function POST(req: NextRequest) {
  try {
    if (!checkRateLimit(req)) {
      return new Response(JSON.stringify({ type: "error", data: "Rate limit exceeded. Please try again later." }), { 
        status: 429,
        headers: { "Content-Type": "application/x-ndjson" }
      });
    }

    let body;
    try {
      body = await req.json();
    } catch {
      return new Response(JSON.stringify({ type: "error", data: "Invalid JSON body." }), { status: 400 });
    }

    const { query } = body;

    if (!query || typeof query !== "string" || query.trim() === "") {
      return new Response(JSON.stringify({ type: "error", data: "Invalid or empty query." }), { 
        status: 400,
        headers: { "Content-Type": "application/x-ndjson" }
      });
    }

    if (query.length > 300) {
       return new Response(JSON.stringify({ type: "error", data: "Query exceeds maximum length of 300 characters." }), { 
        status: 400,
        headers: { "Content-Type": "application/x-ndjson" }
      });
    }

    // Try deterministic match first
    const matchedIntent = matchIntent(query);
    if (matchedIntent) {
      const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(encodeEvent("answer_delta", matchedIntent.answer));
          
          const validEvidence = matchedIntent.evidence.map(id => EVIDENCE_REGISTRY.get(id)).filter(Boolean);
          if (validEvidence.length > 0) {
             controller.enqueue(encodeEvent("evidence", validEvidence));
          }
          
          const validActions = matchedIntent.actions.map(id => ACTION_REGISTRY.get(id)).filter(Boolean);
          if (validActions.length > 0) {
             controller.enqueue(encodeEvent("actions", validActions));
          }
          
          controller.enqueue(encodeEvent("complete"));
          controller.close();
        }
      });
      return new Response(stream, { headers: { "Content-Type": "application/x-ndjson" } });
    }

    // Server-side validation of API key
    if (!process.env.GEMINI_API_KEY) {
       const stream = new ReadableStream({
        start(controller) {
          controller.enqueue(encodeEvent("answer_delta", "I'm currently unable to connect to my AI brain. Please try again later or contact Swayam directly."));
          controller.enqueue(encodeEvent("actions", [ACTION_REGISTRY.get("email"), ACTION_REGISTRY.get("linkedin")]));
          controller.enqueue(encodeEvent("complete"));
          controller.close();
        }
      });
      return new Response(stream, { headers: { "Content-Type": "application/x-ndjson" } });
    }

    // AI Fallback setup
    const portfolioData = getAllPortfolioData();
    const systemInstruction = `
You are an AI Portfolio Operator for Swayam Awari. You are talking to recruiters or engineers.
Your goal is to answer their questions accurately based strictly on the provided portfolio data.
DO NOT invent skills, projects, or experience.
Keep answers concise (1-3 sentences) and recruiter-focused.

AVAILABLE EVIDENCE IDs:
Projects: ${projects.map(p => `project_${p.id}`).join(', ')}
Skills: ${skills.map(s => `skill_${s.id}`).join(', ')}
Experience: ${experience.map(e => `exp_${e.id}`).join(', ')}

AVAILABLE ACTION IDs:
resume, email, linkedin

PORTFOLIO DATA:
${JSON.stringify(portfolioData, null, 2)}

INSTRUCTIONS:
First, answer the user's question directly and concisely in plain text.
Then, if there are relevant evidence IDs or action IDs, call the \`show_portfolio_evidence\` tool with the correct IDs. Do not include markdown or JSON in your text response.
`;

    const model = genAI.getGenerativeModel({
      model: "gemini-3.5-flash",
      systemInstruction,
      tools: [{
        functionDeclarations: [{
          name: "show_portfolio_evidence",
          description: "Display specific portfolio evidence and actions to the user.",
          parameters: {
            type: SchemaType.OBJECT,
            properties: {
              evidence_ids: { 
                type: SchemaType.ARRAY, 
                items: { type: SchemaType.STRING },
                description: "Array of evidence IDs to show. e.g. ['project_soul-academy']"
              },
              action_ids: { 
                type: SchemaType.ARRAY, 
                items: { type: SchemaType.STRING },
                description: "Array of action IDs to show. e.g. ['resume']"
              }
            }
          }
        }]
      }]
    });

    const abortController = new AbortController();
    req.signal.addEventListener('abort', () => abortController.abort());

    // Timeout mechanism
    const timeoutId = setTimeout(() => abortController.abort(), 15000); // 15s timeout

    let result;
    try {
      result = await model.generateContentStream({
        contents: [{ role: "user", parts: [{ text: query }] }]
      }, {
        signal: abortController.signal
      });
    } catch (e: any) {
      clearTimeout(timeoutId);
      console.error("Gemini generation error:", e);
      return new Response(JSON.stringify({ type: "error", data: "AI service unavailable. Please try again." }), { 
        status: 503,
        headers: { "Content-Type": "application/x-ndjson" }
      });
    }

    const stream = new ReadableStream({
      async start(controller) {
        try {
          let hasOutputText = false;
          let outputText = "";

          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) {
              hasOutputText = true;
              outputText += text;
              controller.enqueue(encodeEvent("answer_delta", text));
            }

            const functionCalls = chunk.functionCalls();
            if (functionCalls && functionCalls.length > 0) {
              for (const call of functionCalls) {
                if (call.name === "show_portfolio_evidence") {
                  const args = call.args as any;
                  
                  // Validation
                  let validEvidence: any[] = [];
                  let validActions: any[] = [];

                  if (Array.isArray(args.evidence_ids)) {
                    // Filter out duplicates and limit to max 3
                    const uniqueIds = Array.from(new Set(args.evidence_ids)).slice(0, 3);
                    validEvidence = uniqueIds
                      .map(id => EVIDENCE_REGISTRY.get(id as string))
                      .filter(Boolean);
                  }

                  if (Array.isArray(args.action_ids)) {
                    const uniqueActionIds = Array.from(new Set(args.action_ids)).slice(0, 3);
                    validActions = uniqueActionIds
                      .map(id => ACTION_REGISTRY.get(id as string))
                      .filter(Boolean);
                  }

                  if (validEvidence.length > 0) {
                    controller.enqueue(encodeEvent("evidence", validEvidence));
                  }
                  if (validActions.length > 0) {
                    controller.enqueue(encodeEvent("actions", validActions));
                  }
                }
              }
            }
          }
          
          if (!hasOutputText) {
             controller.enqueue(encodeEvent("answer_delta", "I couldn't find a specific answer for that in Swayam's portfolio."));
          }
          
          controller.enqueue(encodeEvent("complete"));
        } catch (e: any) {
          if (e.name === 'AbortError') {
             controller.enqueue(encodeEvent("error", "Request timed out or was cancelled."));
          } else {
             console.error("Stream processing error", e);
             controller.enqueue(encodeEvent("error", "An error occurred while generating the response."));
          }
        } finally {
          clearTimeout(timeoutId);
          controller.close();
        }
      },
      cancel() {
        abortController.abort();
      }
    });

    return new Response(stream, { headers: { "Content-Type": "application/x-ndjson" } });

  } catch (err: any) {
    console.error("Operator API outer error:", err);
    return new Response(JSON.stringify({ type: "error", data: "Internal server error" }), { 
      status: 500,
      headers: { "Content-Type": "application/x-ndjson" }
    });
  }
}
