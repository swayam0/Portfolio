# AI Portfolio Operator

## Feature Overview
The AI Portfolio Operator is a recruiter-first, interactive experience embedded into the portfolio. Triggered via `Ctrl+K` or a subtle mobile action button, it allows users to navigate the portfolio, query specific skills, and ask natural language questions. It provides both deterministic instant answers for predefined intents and a fallback to an LLM-powered response that retrieves contextual portfolio data using an NDJSON streaming protocol.

## Architecture & Data Flow
1. **Frontend (`CommandCenter.tsx`)**: Captures user input, implements accessibility features (focus trapping, aria-live, dialog semantics), handles user analytics, and processes NDJSON streams from the backend. Lazy-loaded to maintain near-zero initial bundle impact.
2. **Backend (`app/api/operator/route.ts` & `intentMatcher.ts`)**: 
   - Receives requests and enforces rate limits (20 requests per hour).
   - Validates configuration and handles missing API keys gracefully.
   - Evaluates queries against lightweight keyword-scoring for deterministic navigation and instant responses.
   - Streams responses from the Gemini model using function calling to resolve and safely structure evidence/actions from a strict server-side registry.
3. **Data Layer (`data/portfolio/*`)**: Serves as the centralized single source of truth for the frontend UI, deterministic registry, and LLM context.

## File Structure
- `components/CommandCenter.tsx`: The primary accessible Command Palette / AI Operator UI.
- `app/api/operator/route.ts`: API route handling the custom NDJSON transport.
- `app/api/operator/intentMatcher.ts`: Keyword scoring and server-owned registry of evidence/actions.
- `data/portfolio/*`: Verified portfolio models.
- `tests/*`: Jest test suite covering intent classification, boundaries, and validation.

## AI Provider Used
**Google Generative AI (gemini-1.5-flash)**
- Chosen for its speed and native function-calling SDK.
- Fully validated for compatibility.

## Transport Protocol & Validation
- **NDJSON Streaming**: The server explicitly owns the transport protocol. It emits typed events (`answer_delta`, `evidence`, `actions`, `complete`, `error`) instead of brittle model-generated delimiters.
- **Strict Evidence Validation**: The AI model only yields evidence IDs via function calls. These IDs are checked against `EVIDENCE_REGISTRY` and `ACTION_REGISTRY`.
- Model-generated URLs and untrusted metadata are strictly rejected.

## Security & Reliability Protections
- **Prompt Injection Defense**: Keyword normalization intercepts obvious structural commands. The AI fallback restricts actions to server-registered IDs.
- **Rate Limiting**: Sliding window in-memory rate limiter provides best-effort abuse control (Note: In serverless deployments with randomized instances, this is not globally synced; a distributed store like Redis would be needed for global accuracy).
- **Client Sanitization**: UI consumes strictly typed server events.
- **Fault Tolerance**: Includes graceful timeout (15s), AbortSignal propagation, safe configuration degradation, and robust `catch` handling.

## Analytics Events
Integrated with Vercel Analytics (`window.va`):
- `operator_opened`
- `operator_question_submitted`
- `operator_quick_prompt_clicked`
- `operator_answer_completed`
- `operator_answer_failed`
- `operator_evidence_clicked`
- `operator_resume_opened`
- `operator_contact_clicked`

## Mobile Discoverability
A subtle "Ask AI" floating action button is present on mobile devices, providing an accessible, high-touch-target alternative to `Ctrl+K`.

## Future Improvements
- Implement global Redis rate-limiting if Vercel serverless traffic necessitates it.
- Client-side conversational caching for repetitive queries.
