# Cosmo

A pickup-only cosmetics shop template. Copy this repo for a client, then change brand, catalog, and keys.

## Stack

React, TypeScript, Vite, Tailwind CSS, Supabase, Paystack. Host on Vercel.

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

## Supabase

Create a project, paste `supabase/migrations/0001_init.sql` into the SQL editor, then fill `.env`.

v1 treats every authenticated user as an admin. Create one Auth user for the shop owner.

## Scripts

- `npm run dev` — local app
- `npm run build` — production bundle
- `npm run lint` — oxlint
