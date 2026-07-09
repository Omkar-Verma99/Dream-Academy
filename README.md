# DREAM Academy

Official website for **DREAM Academy** (Diabetes Research & Excellence in Advanced Metabolic Medicine Academy) — a registered charitable trust in Lucknow, India.

## Stack

- [Next.js 15](https://nextjs.org/) + React 19 + Tailwind CSS 4
- [Sanity CMS](https://www.sanity.io/) for content
- Staff portal at `/portal/login` for camps, events, and research

## Local development

```bash
npm install
cp .env.example .env
# Fill in Sanity + staff portal values in .env
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Staff portal

- URL: `/portal/login`
- Configure `STAFF_ALLOWED_EMAILS`, `STAFF_PORTAL_PASSWORD`, and `STAFF_SESSION_SECRET` in `.env`

## Deploy

Recommended: [Vercel](https://vercel.com) with GoDaddy DNS pointing to your deployment.

Set all variables from `.env.example` in your hosting dashboard. Never commit `.env`.
