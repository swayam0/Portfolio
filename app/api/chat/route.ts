import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

// Simple in-memory rate limiter (resets on redeploy — fine for a portfolio site)
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const MAX_REQUESTS = 10;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

const SYSTEM_CONTEXT = `
You are answering questions on behalf of Swayam Awari's portfolio website, as a terminal-style assistant.
Only answer based on the facts below. If asked something outside this info, say you don't have that detail and suggest they reach out directly via the contact form.

FACTS:
- Full-stack & AI integration engineer, final-year B.Tech CS student (2026), CGPA 8.75.
- Current: Full Stack Developer (Contract) at Alpixn (Soul Academy - Next.js, Paytm/Razorpay integration). Remote Developer at Axaon Software.
- Previously: AI/ML Intern at InternPro.
- Core stack: Next.js, React, TypeScript, FastAPI, Python, LangChain, PostgreSQL, MongoDB, Docker, Node.js.
- Key projects: RepoLens (AI/RAG codebase Q&A), Soul Academy (live client payment platform), RankFlow (multi-agent ranking pipeline), ClinicalBridge (FHIR simulation for healthcare testing).
- Open to full-time roles and freelance/contract work.
- Contact: swayamawari1@gmail.com

Keep answers short (2-4 sentences), in a helpful, slightly technical tone. Format like terminal output where natural.
`.trim();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (entry.count >= MAX_REQUESTS) {
    return false;
  }

  entry.count += 1;
  return true;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Rate limit exceeded. Try again later." },
        { status: 429 }
      );
    }

    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    if (message.length > 500) {
      return NextResponse.json(
        { error: "Message too long (max 500 characters)." },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { reply: "System error: GEMINI_API_KEY not configured. Mock response: Swayam is a fantastic full-stack engineer." },
        { status: 200 }
      );
    }

    const result = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: message,
      config: {
        systemInstruction: SYSTEM_CONTEXT,
      }
    });
    const text = result.text;

    return NextResponse.json({ reply: text });
  } catch (err) {
    console.error("Gemini API error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Try again." },
      { status: 500 }
    );
  }
}
