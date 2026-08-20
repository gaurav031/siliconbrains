# SiliconBrain AI — Space AI Startup Website

A production-ready, full-stack website for **SiliconBrain AI**, built with:

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** (animations)
- **PostgreSQL + Prisma ORM** (real database, not mock data)
- **Zod + React Hook Form** (validated, database-backed contact form)
- Dark, premium, glassmorphism "Mission Control" design system

---

## 1. Prerequisites

- Node.js 18.18+ (Node 20+ recommended)
- A PostgreSQL database. Any of these work:
  - Local Postgres (`brew install postgresql` / `apt install postgresql`)
  - [Neon](https://neon.tech) (free serverless Postgres)
  - [Supabase](https://supabase.com)
  - [Railway](https://railway.app)

## 2. Setup

```bash
# 1. Install dependencies
npm install

# 2. Configure your database
cp .env.example .env
# Edit .env and set DATABASE_URL to your real Postgres connection string

# 3. Generate the Prisma client
npx prisma generate

# 4. Create the database tables
npx prisma migrate dev --name init

# 5. Seed real sample content (projects, blog posts, publications)
npm run db:seed

# 6. Run the dev server
npm run dev
```

Visit **http://localhost:3000**.

## 3. What's database-backed (real, not fake)

| Feature | Source |
|---|---|
| Contact form (`/contact`) | Writes to `ContactSubmission` table via `/api/contact` (POST) |
| Newsletter signup (footer) | Writes to `NewsletterSubscriber` table via `/api/newsletter` |
| Projects (`/projects`, `/projects/[slug]`) | Reads from `Project` table |
| Blog (`/blog`, `/blog/[slug]`) | Reads from `BlogPost` table |
| Publications (`/publications`) | Reads from `Publication` table |
| GitHub (`/github`) | Live fetch from the real GitHub API (`api.github.com/orgs/siliconbrainsai/repos`) with graceful fallback if the org doesn't exist yet |

All pages fall back to sample content if the database is empty/unreachable, so the
site never breaks — but once you run `npm run db:seed`, everything you see is real
data coming out of Postgres.

To view/edit the raw data with a GUI:
```bash
npm run db:studio
```

## 4. Admin: viewing contact submissions

`GET /api/contact` returns the latest 50 submissions as JSON. **Protect this route**
(add auth middleware) before deploying to production — it is unauthenticated by default.

## 5. Deployment

- **Vercel** (recommended for Next.js): connect the repo, set `DATABASE_URL` in
  Project Settings → Environment Variables, then deploy. Add a `postinstall` build
  step (already in `package.json`) so Prisma Client generates automatically.
- Run `npx prisma migrate deploy` against your production database once before/after
  first deploy (or wire it into your CI/CD pipeline).
- Any Node host (Railway, Render, Fly.io, a VPS) works the same way — set
  `DATABASE_URL`, run `npm run build && npm start`.

## 6. Project structure

```
app/
  page.tsx                 → Home
  about/page.tsx            → About
  projects/page.tsx         → Projects listing (DB)
  projects/[slug]/page.tsx  → Project detail (DB)
  research/page.tsx         → Research
  blog/page.tsx             → Blog listing (DB)
  blog/[slug]/page.tsx      → Blog detail (DB)
  publications/page.tsx     → Publications (DB)
  github/page.tsx           → Live GitHub API
  contact/page.tsx          → Contact (DB-backed form)
  api/contact/route.ts      → POST/GET contact submissions
  api/newsletter/route.ts   → POST newsletter subscribers
components/
  layout/                  → Navbar, Footer
  home/                    → SpaceBackground (animated hero)
  ui/                      → Section, Badge, GlassCard
  ContactForm.tsx          → Validated form (Zod + RHF)
lib/
  prisma.ts                → Prisma client singleton
  validation.ts             → Zod schemas
prisma/
  schema.prisma            → PostgreSQL data model
  seed.ts                  → Seed script with real content
```

## 7. Notes

- Swap the "Screenshot Placeholder" / "Cover Image Placeholder" blocks with real
  images once you have them — everything else is fully built, no other placeholders.
- Update social links, GitHub org name (`siliconbrainsai`), and email addresses in
  `components/layout/Footer.tsx` and `app/contact/page.tsx` to your real accounts.
- Swap the Google Map placeholder in `/contact` for a real embed (Google Maps
  Embed API) once you have an office address and API key.
