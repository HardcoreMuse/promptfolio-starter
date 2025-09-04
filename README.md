# Promptfolio — Starter (Cloudflare Pages + Supabase, $0 tier)

A minimal, **professional-looking** scaffold to launch Promptfolio on (almost) $0 and scale cleanly later.

## What’s inside
- **Next.js (App Router)** + Tailwind (tokens-friendly) — deploy to **Cloudflare Pages**.
- **Supabase** (Postgres + Google OAuth + Storage) — wire in later; client stub included.
- **Consent-gated analytics**: PostHog stub (1M free events) + Cloudflare Web Analytics.
- **Public pages** ready for SEO/OG; simple Sample Portfolio & Card routes.

## Prereqs
- Node 18+ and pnpm or npm
- Cloudflare account (Pages) — free
- Supabase project — free

## 1) Local dev
```bash
# install deps
pnpm install   # or: npm install

# copy envs and fill values
cp .env.example .env.local
# set:
# NEXT_PUBLIC_SUPABASE_URL=...
# NEXT_PUBLIC_SUPABASE_ANON_KEY=...
# NEXT_PUBLIC_POSTHOG_KEY=... (optional)
# NEXT_PUBLIC_APP_URL=http://localhost:3000

# run dev server
pnpm dev       # or: npm run dev
```

Visit http://localhost:3000 and click **Sample Portfolio**.

## 2) Deploy to Cloudflare Pages (free)
- Create a new Pages project, connect this repo.
- Framework preset: **Next.js** (auto-detected). Build command: `npm run build`. Output: `.next`.
- Set environment variables (Production + Preview): the `NEXT_PUBLIC_*` keys from `.env.local`.
- Custom domain: add your domain; HTTPS on.

> If you hit SSR issues, enable **Pages Functions** automatically or switch to “Node compatibility: v22+”. Next.js on Pages is supported; no adapter needed for this starter.

## 3) Hook up Supabase (later this week)
- In Supabase, enable **Google OAuth** only (avoid email costs).
- Create basic tables: `users`, `portfolios`, `cards`, `tags`, `card_tags`. (See PRD for schema.)
- Replace placeholder sample routes with real queries in server components.

## 4) Analytics & consent
- If you provide `NEXT_PUBLIC_POSTHOG_KEY`, analytics will start **only after** user clicks “Accept.”
- Add Cloudflare Web Analytics via Pages settings (no JS required).

## 5) Next steps (from our plan)
- Clone-to-Library flow
- Exports (JSON/CSV/MD) via a simple API route or Worker
- Slugs/handles + redirects
- OG image generator route
- Founding Creators invite

---

**Why this works:** Polished UI and SEO-ready public pages on a truly free stack. As you grow, upgrade Supabase or add a $5 Workers plan without rewriting the app.
