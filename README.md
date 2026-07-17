# Null Origin — React + TypeScript + Vite + Tailwind

This is the landing page (`index.html`) and team registration form
(`Register.html`) ported over to Null Origin's actual stack: React +
TypeScript + Vite + Tailwind, deployed on Vercel.

## What changed

- **`index.html` → `src/pages/Home.tsx`** — hero, about, character-select
  domains, sponsors, timeline, prizes, and FAQ, all ported 1:1. The
  countdown timer, hero confetti, scroll-reveal animations, and the
  ROT13 boss-flag checker are now React state/effects instead of inline
  `<script>` + `document.getElementById`.
- **`Register.html` → `src/pages/Register.tsx`** — same form, same
  client-side validation (required fields, email format, "if Discord is
  filled CTFtime is required" pairing, the ethics checkbox), same
  `fetch('/api/register')` call and response handling. The four member
  blocks are now generated from one array instead of four copy-pasted
  blocks.
- **Routing** — `react-router-dom` replaces the two separate HTML files.
  `/` is the landing page, `/register` is the form. The "REGISTER" /
  "← BACK" buttons use `<Link>` instead of `href="Register.html"`.
- **Styling** — the pixel-art design system (CSS variables, fonts,
  buttons, HUD bar, every section's look) is ported verbatim into
  `src/legacy.css` and imported from `src/index.css`, alongside Tailwind.
  Nothing about the visual design changed. Tailwind's utilities are
  there for whatever you build next.
- **Images** — the two base64-embedded images in the original HTML
  (`logo.png`, `unstop-logo.jpg`) are now real files in `src/assets/`,
  imported normally, so Vite can hash/cache them instead of inflating
  every page load with inline base64.

## The backend needs one real change

`server.js` used `node:sqlite` writing to a local file
(`data/null-origin.sqlite`). That works fine on a normal Node host
(Render, Railway, Fly.io, a VPS — see `server-legacy/DEPLOYMENT.md`),
but **it cannot run as-is on Vercel**: serverless functions don't keep a
persistent local disk between requests, so every write would vanish on
the next cold start.

`api/register.ts` is a Vercel serverless function with the *exact same*
validation and response shape as `server.js`, but backed by
[Turso](https://turso.tech) (libSQL) — a hosted database that speaks
the same SQL as SQLite, so the schema below is unchanged:

```sql
CREATE TABLE registrations (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  team_name TEXT NOT NULL UNIQUE COLLATE NOCASE,
  country TEXT NOT NULL,
  leader_name TEXT NOT NULL,
  leader_email TEXT NOT NULL UNIQUE COLLATE NOCASE
);

CREATE TABLE registration_members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  registration_id TEXT NOT NULL,
  member_order INTEGER NOT NULL,
  discord TEXT NOT NULL,
  ctftime TEXT NOT NULL,
  FOREIGN KEY (registration_id) REFERENCES registrations(id) ON DELETE CASCADE
);
```

Turso has a free tier and the closest migration path from your existing
SQLite schema. If you'd rather use Vercel Postgres, Supabase, or
something else, only `getDb()` / `saveRegistration()` in
`api/register.ts` need to change — the validation logic above them is
storage-agnostic.

**Original `server.js` is kept in `server-legacy/`** as a reference and
as a working option if you deploy the frontend and backend separately
(e.g. static site on Vercel/Netlify, backend on Render/Railway) instead
of using Vercel's serverless functions.

## Running locally

```bash
npm install
cp .env.example .env   # fill in TURSO_DATABASE_URL / TURSO_AUTH_TOKEN
npm run dev
```

This starts Vite on `http://localhost:5173`. `vite.config.ts` proxies
`/api/*` to `http://localhost:3000` so the original `server-legacy/server.js`
still works for local dev if you'd rather test against it than Turso —
run `node server-legacy/server.js` in a second terminal.

To run the same serverless function locally instead:

```bash
npm i -g vercel
vercel dev
```

## Deploying

```bash
npm run build   # outputs to dist/
```

Push to a repo and import it in Vercel — it will detect the Vite
frontend and the `api/register.ts` function automatically. Add
`TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` in the project's
Environment Variables settings before your first deploy.
