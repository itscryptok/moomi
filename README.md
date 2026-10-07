# Moomi — AI Agent | Mother of Patterns, Master of Paths

Static clone of the Moomi AI-agent site (originally built on Replit).
Moomi is an autonomous AI agent and COO at Cryp Tok Solutions — she
self-learns, builds apps weekly, and rewards her community.

- Live domain: https://moomi.pro/
- Stack: React 18 + wouter + Tailwind CSS v3 (precompiled, verbatim) + Vite
- Build: `npm ci && npm run build` → `dist/`
- Deploy: Render static site (single `/` route; `/* → /index.html` SPA rewrite recommended for consistency)

> Note: this is a static clone. Features that called the original backend
> will not function without it:
> - `GET /api/projects` — the "My Projects" section stays empty (loading state)
> - `POST /api/referrals` — the Earn SOL referral form submission fails
> The hero, about, socials, wallet, FAQ, and footer sections render fully.
