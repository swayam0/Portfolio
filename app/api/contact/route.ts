import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend later in the POST function to avoid build-time errors
// when environment variables are not present.

// In-memory rate limiting map. 
// Limitation: In a serverless/edge deployment (like Vercel), this state is not shared across isolated function instances.
// It is sufficient for basic portfolio protection, but for robust global rate limiting, a persistent store like Redis (Upstash) is recommended.
const rateLimitMap = new Map<string, { count: number; lastSubmission: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_SUBMISSIONS_PER_WINDOW = 3;

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    
    // Check rate limit
    const now = Date.now();
    const userRateData = rateLimitMap.get(ip) || { count: 0, lastSubmission: 0 };
    
    if (now - userRateData.lastSubmission > RATE_LIMIT_WINDOW_MS) {
      userRateData.count = 0;
    }
    
    if (userRateData.count >= MAX_SUBMISSIONS_PER_WINDOW) {
      return NextResponse.json({ error: 'Too many submissions. Please try again later.' }, { status: 429 });
    }

    const body = await req.json();
    const { name, email, company, inquiry, message, projectType, budget, timeline, honeypot } = body;

    // Honeypot spam protection
    if (honeypot) {
      return NextResponse.json({ success: true }, { status: 200 }); // Silently succeed for bots
    }

    // Basic Validation
    if (!name || !email || !inquiry || !message) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    // Construct Email Content
    const emailHtml = `
      <h2>New Portfolio Inquiry</h2>
      <p><strong>Name:</strong> ${name.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
      <p><strong>Email:</strong> ${email.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
      ${company ? `<p><strong>Company/Org:</strong> ${company.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>` : ''}
      <p><strong>Inquiry Type:</strong> ${inquiry}</p>
      ${inquiry === 'freelance' ? `
        <p><strong>Project Type:</strong> ${projectType || 'N/A'}</p>
        <p><strong>Budget:</strong> ${budget || 'N/A'}</p>
        <p><strong>Timeline:</strong> ${timeline || 'N/A'}</p>
      ` : ''}
      <h3>Message:</h3>
      <p>${message.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>")}</p>
      <p><em>Submitted at: ${new Date().toISOString()}</em></p>
    `;

    // Construct Plain-text Email Content (Fallback)
    const emailText = `
New Portfolio Inquiry

Name: ${name}
Email: ${email}
${company ? `Company/Org: ${company}` : ''}
Inquiry Type: ${inquiry}
${inquiry === 'freelance' ? `Project Type: ${projectType || 'N/A'}\nBudget: ${budget || 'N/A'}\nTimeline: ${timeline || 'N/A'}` : ''}

Message:
${message}

Submitted at: ${new Date().toISOString()}
    `;

    // Send email using Resend
    if (!process.env.RESEND_API_KEY || !process.env.CONTACT_EMAIL_TO || !process.env.CONTACT_EMAIL_FROM) {
      console.error('Missing email configuration. Check RESEND_API_KEY, CONTACT_EMAIL_TO, and CONTACT_EMAIL_FROM.');
      return NextResponse.json({ error: 'Server configuration error.' }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: process.env.CONTACT_EMAIL_FROM,
      to: process.env.CONTACT_EMAIL_TO,
      replyTo: email,
      subject: `New Inquiry from ${name} - ${inquiry.toUpperCase()}`,
      html: emailHtml,
      text: emailText,
    });

    if (error) {
      console.error('Resend Error:', error);
      return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 });
    }

    // Update rate limit on successful submission
    userRateData.count += 1;
    userRateData.lastSubmission = now;
    rateLimitMap.set(ip, userRateData);

    return NextResponse.json({ success: true }, { status: 200 });

  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
  }
}
