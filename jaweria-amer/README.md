# Jaweria Amer Academy

A premium Cambridge O Level and A Level learning platform for high-performing students and families in Karachi who want structured, exam-focused English preparation.

## Overview

The site presents programmes, a free resource vault, and a clear teaching philosophy. Content is built around how Cambridge examiners award marks: rubric-led practice, explicit outcomes, and calm mentorship rather than syllabus-only coverage.

## Features

- **Course directory** — Filterable programmes (O Level, A Level, Literature, Creative Writing) with cards linking to detail pages.
- **Course detail pages** — Statically generated routes under `/courses/[id]` with outcomes, syllabus bullets, curriculum modules, pricing, and WhatsApp enrolment CTAs.
- **Resource vault** — `/resources` lists past papers, marking schemes, examiner reports, and checklists (placeholders for downloads until real assets are wired in).
- **About** — Bio, philosophy, and differentiation for trust-building.
- **Legal** — `/privacy` and `/terms` with dated copy.
- **Admin area** — Password-protected dashboard under `/admin` (courses, resources, leads, settings) using cookie-based sessions. **Do not expose admin credentials;** restrict to trusted operators only.
- **WhatsApp** — Floating action button and contextual links use numbers and default messages from `siteConfig` in `src/lib/data.ts`.
- **Responsive layout** — Mobile-first navigation, footer, and back-to-top control.
- **SEO** — App Router metadata, Open Graph and Twitter defaults, canonical URLs on main public routes, `noindex` on admin.

## Tech stack

- [Next.js](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) v4
- [shadcn/ui](https://ui.shadcn.com/) patterns (`src/components/ui/`)
- [Lucide React](https://lucide.dev/) icons
- [Zod](https://zod.dev/) (where validation is used)
- [Sonner](https://sonner.emilkowal.ski/) toasts in admin

## Repository layout

| Path | Purpose |
|------|--------|
| `src/app/` | Routes, layouts, and `globals.css`. Public routes: `/`, `/courses`, `/courses/[id]`, `/resources`, `/about`, `/privacy`, `/terms`. Admin: `/admin/login`, `/admin/*` dashboard. |
| `src/lib/data.ts` | **Primary content source** — `courses`, `resources`, and `siteConfig` (name, SEO defaults, WhatsApp, email, stats, roadmap, navigation). |
| `src/lib/utils.ts` | Shared helpers (e.g. `cn` for class names). |
| `src/lib/admin/` | Admin auth, server actions, and persistence helpers. |
| `src/components/` | Shared UI: navigation, footer, course cards, WhatsApp button, etc. |
| `src/components/admin/` | Admin chrome (sidebar, topbar). |
| `src/middleware.ts` | Protects `/admin` (except login) and sends `X-Robots-Tag` for admin routes. |
| `public/` | Static assets served as-is. |
| `components.json` | shadcn/ui configuration. |

## Local development

**Requirements:** Node.js 20.9+ (see `engines` in `package.json`).

```bash
cd jaweria-amer
npm install
cp .env.example .env.local
```

Edit `.env.local` with values from the [Environment variables](#environment-variables) section. For local browsing of public pages only, you can omit admin variables until you use `/admin`.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Development server (Turbopack). |
| `npm run build` | Production build. |
| `npm run start` | Serve the production build locally. |
| `npm run lint` | ESLint. |
| `npm run typecheck` | TypeScript check without emit. |

## Build

```bash
npm run build
```

Resolve any TypeScript or ESLint issues before deploying. Production builds expect `SESSION_SECRET` to be set when admin routes are used at runtime (see below).

## Environment variables

Copy `.env.example` to `.env.local` for development. On Vercel, define the same keys under **Project → Settings → Environment Variables** for Production (and Preview if you use admin there).

| Variable | Scope | Description |
|----------|--------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Public | Canonical origin, no trailing slash (e.g. `https://www.yourdomain.com`). Drives `metadataBase`, Open Graph resolution, and canonical URLs. |
| `SESSION_SECRET` | Server | Secret embedded in the admin session cookie. **Required in production** when using `/admin`. Use a long random value (e.g. `openssl rand -base64 32`). |
| `ADMIN_EMAIL` | Server | Login email for `/admin/login`. |
| `ADMIN_PASSWORD` | Server | Login password for `/admin/login`. Use a strong, unique password. |

**WhatsApp and contact copy** live in `src/lib/data.ts` (`whatsappNumber`, `whatsappMessage`, `email`, etc.), not in environment variables, so marketing can update them in one file.

Never commit real `.env` or `.env.local` files. `.env.example` contains placeholders only.

## Deployment (Vercel)

1. Connect the Git repository (root of this app is the folder containing `package.json`).
2. **Framework preset:** Next.js. **Build command:** `npm run build`. **Output:** default (`.next`).
3. Set `NEXT_PUBLIC_SITE_URL` to your production URL.
4. Set `SESSION_SECRET`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` if you use the admin dashboard.
5. Deploy. No `vercel.json` is required for a standard App Router setup.

Preview deployments should also set `NEXT_PUBLIC_SITE_URL` to the preview URL if you care about accurate OG tags on previews; otherwise metadata falls back to the configured value.

## Brand and positioning

- **Tone:** Mentor–scholar: calm, structured, high-trust.
- **Audience:** Serious O/A Level students and parents in Karachi (and online where applicable).
- **Promise:** Exam-oriented structure aligned to how papers are marked, without hype or grade guarantees in the copy.

Visual design tokens and typography are defined in `src/app/globals.css` and Tailwind theme extensions; keep changes minimal unless updating brand guidelines.

## Maintaining course and site content

1. Open `src/lib/data.ts`.
2. **`courses` array** — Each object must satisfy the `Course` interface (`id`, `title`, `category`, `curriculum`, etc.). The `id` field becomes the URL segment (`/courses/o-level-english-1123`). After adding a course, `generateStaticParams` in `src/app/courses/[id]/page.tsx` will pick it up automatically on the next build.
3. **`resources` array** — Same pattern with the `Resource` interface and `/resources` UI.
4. **`siteConfig`** — Global title, meta description, WhatsApp link, stats, roadmap steps, and main navigation labels/links.

Run `npm run build` after substantive data edits to confirm types and static generation still succeed.

## Optional future improvements

- Wire resource “Download” actions to real PDFs or external CAIE links.
- Replace the About page portrait placeholder with a production image asset.
- Add `sitemap.ts` / `robots.ts` if you want finer control than metadata alone.
- Move admin credentials to a database or SSO if multiple staff need access.
- Add automated tests (e.g. Playwright) for critical flows and smoke checks on deploy.

## License

MIT — see [LICENSE](./LICENSE).
