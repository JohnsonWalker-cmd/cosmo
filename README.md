# Cosmo

A pickup-only cosmetics shop template. Copy this repo for a client, then change brand, catalog, and keys.

> **Mid-transition:** the backend is being rebuilt from Supabase to a custom Express + MongoDB API (`server/`), as a deliberate learning project — not a reliability issue with Supabase. The frontend below still describes the Supabase-era setup and is being migrated. See [`docs/roadmap.md`](docs/roadmap.md) for full status and what's next.

## Stack

React, TypeScript, Vite, Tailwind CSS, Paystack on the frontend. Backend in transition: Supabase (Postgres, Auth, Storage) → custom Node/Express + MongoDB (`server/`). Frontend hosts on Vercel; the new backend targets Render + MongoDB Atlas.

## Run it

```bash
cp .env.example .env
npm install
npm run dev
```

The storefront shell runs without Supabase. Catalog, checkout, and admin need a project.

## Rebrand a client

1. Edit `src/config/site.ts` (name, copy, address, hours, phone, WhatsApp, currency).
2. Change theme tokens in `src/index.css` (`--color-accent`, `--color-canvas`, fonts).
3. Replace `public/favicon.svg` and any logo.
4. Point `.env` at that client's Supabase and Paystack keys.

Do not scatter their name through components.

## Supabase (legacy, being replaced)

Create a project, paste `supabase/migrations/0001_init.sql` (then `0002`, `0003`) into the SQL editor, then fill `.env`.

v1 treats every authenticated user as an admin. Create one Auth user for the shop owner.

## Backend (`server/`, in progress)

```bash
cd server
cp .env.example .env   # fill in MONGODB_URI (MongoDB Atlas) and JWT_SECRET
npm install
npm run dev
```

Runs on `http://localhost:4000`. See [`docs/roadmap.md`](docs/roadmap.md) for build status — models are done, auth/routes/seed/frontend-rewiring are still pending, so the frontend isn't pointed at this API yet.

## Scripts

Frontend (repo root):
- `npm run dev` — local app
- `npm run build` — production bundle
- `npm run lint` — oxlint

Backend (`server/`):
- `npm run dev` — local API with auto-restart
- `npm run build` — compile TypeScript
- `npm run start` — run the compiled API
- `npm run seed` — populate demo catalog data (not yet implemented)
