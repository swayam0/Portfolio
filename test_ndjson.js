const fs = require('fs');
const env = fs.readFileSync('.env.local', 'utf8');
const key = env.match(/GEMINI_API_KEY=(.*)/)[1].trim();

const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(key);

async function run() {
  const model = genAI.getGenerativeModel({ 
    model: 'gemini-1.5-flash',
    systemInstruction: 'Respond ONLY in NDJSON (Newline Delimited JSON). One JSON object per line. Shape: {"type": "text", "delta": "..."} or {"type": "evidence", "id": "..."}. No markdown. Example:\n{"type": "text", "delta": "Hello"}\n{"type": "evidence", "id": "repolens"}'
  });

  const result = await model.generateContentStream('What projects use Next.js?');
  for await (const chunk of result.stream) {
    process.stdout.write(chunk.text());
  }
}
run();
