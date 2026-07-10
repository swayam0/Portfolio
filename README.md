# Swayam Awari — Portfolio

A clean, minimal, recruiter-friendly portfolio built with Next.js 14 (App Router), TypeScript, and Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000 to view it.

## Structure

- `app/page.tsx` — assembles all sections
- `components/Header.tsx` — sticky nav
- `components/Hero.tsx` — intro + quick stats
- `components/Projects.tsx` — project list (edit the `projects` array to add/remove work)
- `components/Stack.tsx` — tech stack grid
- `components/Experience.tsx` — roles + education
- `components/Contact.tsx` — socials + footer

## Before you deploy

1. Update the `mailto:` link and socials in `components/Contact.tsx`.
2. Swap in real project links (`href`) in `components/Projects.tsx` once live demos/repos are ready.
3. Update `metadata` in `app/layout.tsx` (title/description) if needed for SEO.
4. Deploy on Vercel: `vercel --prod` (or connect the GitHub repo in the Vercel dashboard).

## Design notes

- Fonts: Fraunces (display/serif) + Public Sans (body) + JetBrains Mono (labels/tags), loaded via `next/font/google` — no extra requests, no layout shift.
- Palette: warm paper background, near-black ink, single rust accent — kept deliberately restrained for a fast, professional read.
- No client-side JS beyond CSS animations — pages stay fast and simple to maintain.
