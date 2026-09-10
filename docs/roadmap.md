# Roadmap

Source of truth for where this project is and what's next. Update this as steps complete — don't let it drift.

## V1 feature list (from the original brief)

**Customer-facing:** homepage, catalog/listing, product detail (variants, stock), cart, checkout (Paystack), order confirmation, pickup info.
**Admin-facing:** admin login, product management, stock management, order management.
**Supporting:** responsive design, basic SEO.
**Explicitly out of scope for v1:** customer accounts/login/order history, reviews, delivery/shipping, discount codes, multi-admin roles, email marketing.

## Shipped

- **`feat/scaffold`** (merged) — storefront shell: routing, layout, theme tokens in `src/config/site.ts` / `src/index.css`, so rebranding a client is config + theme, not a rebuild.
- **`feat/catalog`** (merged) — home/shop/product pages wired to real data, stock and shade/size display, RLS-hardened order status handling.
- **`feat/cart`** (paused, not merged) — a full guest-cart implementation on Supabase anonymous auth + RLS. Superseded by the MERN pivot below; kept as a reference, not deleted.

## Mid-build pivot: Supabase → custom MERN backend

Partway through cart/checkout, the decision was made to replace Supabase (Postgres + Auth + RLS) with a hand-built Express + MongoDB API. **Reason: a deliberate learning goal (build backend fundamentals hands-on), not a reliability complaint about Supabase.** This is a real scope change from the original brief — it drops the "$0-15/year, free-tier-only" hosting assumption (a persistent Node server + MongoDB Atlas need paid tiers once this goes live for a real client) and it means re-implementing everything Supabase gave for free: auth, access control, file storage.

Working on branch `feat/mern-backend`.

### Backend build-out (in progress)

1. ✅ **Scaffold** — `server/` with Express, TypeScript, MongoDB connection (`src/index.ts`, `src/env.ts`, `src/lib/db.ts`). Confirmed working end-to-end against a real MongoDB Atlas cluster.
2. ✅ **Mongoose models** — `src/models/{User,Category,Product,Cart,Order}.ts`. Key design decisions: variants embedded in `Product`, cart/order items embedded with a mix of references (`productId`) and frozen snapshots (`nameSnapshot`, `unitPriceCents`) so order history never changes retroactively. `User.role` defaults to the least-privileged `"guest"`, matching the "authenticated ≠ admin" lesson learned the hard way on the Supabase RLS bug (see `supabase/migrations/0003_restrict_guest_order_status.sql`).
3. ⬜ **Auth** — JWT in an httpOnly cookie. Guest session issuance (replacing `supabase.auth.signInAnonymously()`), admin login (bcrypt), `requireAuth`/`requireAdmin` middleware — this is where MongoDB's lack of RLS means access rules move into hand-written Express code.
4. ⬜ **Catalog routes** — `GET /api/categories`, `GET /api/products`, `GET /api/products/:slug`, admin-only writes.
5. ⬜ **Cart routes** — guest-scoped CRUD on `Cart`/embedded items, same behavior as the paused Supabase version (merge on add, clamp to stock).
6. ⬜ **Order routes** — guest-insertable, forced to `status: "pending"`, admin-only status transitions.
7. ⬜ **Seed script** (`npm run seed`) — demo catalog data, replacing `supabase/migrations/0002_seed_demo_products.sql`.
8. ⬜ **Frontend rewiring** — replace `src/lib/supabase.ts`, `src/lib/catalog.ts`, `src/lib/cart.ts`, `src/lib/database.types.ts` with calls to this API (`VITE_API_URL`, `credentials: "include"`). Touches `HomePage`, `ShopPage`, `ProductPage`, `CartPage`.

### Deploy target

Render (free tier for now; paid Starter tier — ~$7/mo — once this serves a real client, since free tier cold-starts after idle). MongoDB Atlas free (M0) tier for now.

## After the backend rewiring lands

- **Checkout + Paystack** — customer name/phone form, order summary, Paystack payment, confirmation page. Originally estimated 2-3 days + 2-3 days for Paystack integration in the source brief.
- **Admin panel** — product/stock/order management UI, behind the new JWT admin auth.
- **Responsive polish + testing**, then deployment + handover.

## Deferred to v1.1 (post-launch)

- Customer accounts (email + password), building on the anonymous-session-upgrade pattern (a guest's JWT identity becomes a real account's identity, so their in-progress cart carries over with no merge step).
- Order history for signed-in customers.
- Whenever accounts ship, every `Model.role`/access-control check needs re-auditing — the same class of bug that hit `supabase/migrations/0003_restrict_guest_order_status.sql` (an "authenticated = admin" assumption silently becoming false) will resurface the moment non-admin users can be `authenticated`.
