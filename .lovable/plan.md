The spec describes a full members-only portal: login, tier-gated dashboard (Campfire), 6-step Expedition Planner, Trophy Room, Field Journal, Community, Conservation Score, Account, PH messaging, shipment tracking, and more. That's many weeks of work — I'll deliver it in phases so each one is shippable and reviewable. Below is the proposed sequence; this plan covers **Phase 1 and 2** in detail (what I'd build now), with later phases listed for visibility.

---

## Phase 1 — Foundations (this build)

**Goal:** logged-in users land on a working portal shell under `/portal`, public marketing site stays as-is.

1. **Enable Lovable Cloud** — needed for auth, user profiles, bookings, draft persistence, PH data, etc. (no Supabase mention in UI copy).
2. **Auth: "The Camp Gate"** (`/login`)
   - Email/password + Google sign-in (defaults).
   - Branded dark screen with topographic SVG background, brass CTA "Enter the Camp", "Request Observer Pass" link to existing `/membership-apply`.
   - `/auth` route + `/reset-password` page.
3. **Database schema** (initial tables, with RLS + GRANTs):
   - `profiles` (auto-created via trigger, fields: display_name, tier, avatar_url).
   - `app_role` enum (`observer`, `tracker`, `member`, `admin`) + `user_roles` table + `has_role()` security-definer fn.
   - `species` (seed: Lion, Elephant, Buffalo, Leopard, Kudu, Zebra, Warthog, Eland — name, slug, base_price, concession_tag, image).
   - `professional_hunters` (name, bio, specialties, photo).
   - `bookings` (user_id, species_id, ph_id, start_date, end_date, party_size, status: draft|submitted|confirmed|completed, kit jsonb, notes, total_estimate).
4. **Portal shell** at `/_authenticated/portal/*`
   - Sidebar nav (Dashboard, My Hunts, Plan New Hunt, Account) — Trophy Room / Journal / Community / Conservation listed but flagged "Coming soon".
   - Topbar with user menu, sign out.
   - Design tokens: aligned to spec (charcoal `#1a1a1a`, brass `#c9a84c`, copper `#b87333`, canvas `#d4c5a9`, warm whites). Layered on top of the existing site's `--accent` brass which already matches.
5. **"The Campfire" dashboard** (`/portal`) — widget grid:
   - Next Hunt card (from latest confirmed/submitted booking).
   - Trophy Room placeholder card.
   - Field Journal latest-issue card (static for now).
   - Quick Actions row.
   - Weather Window card (reuses existing `WeatherWidget`).
   - Recent Activity timeline (from bookings + static seed).
   - Observer tier sees upgrade CTAs in place of gated widgets.

## Phase 2 — Expedition Planner (booking engine MVP)

`/portal/book` — 6-step wizard, save-as-draft to `bookings` table:

1. **Quarry** — species grid (DB-driven) + Iringa concession map (Leaflet, OSM tiles — no Mapbox token required) with camp pin at 6°54'21.0"S 34°59'14.8"E.
2. **Window** — date range calendar, mock hunt-score (temp/wind/moon heuristic), PH availability list.
3. **PH Pairing** — PH cards from DB with match badges.
4. **Camp** — accommodation tier toggles.
5. **Kit** — checklist of gear/rifle rental add-ons.
6. **Commit** — itemised cost summary, deposit CTA wired to existing `/api/checkout`.
   - "Save Progress" persists draft; resumable for 7 days.
   - Submit → row status `submitted`, appears on dashboard + admin inbox.

---

## Later phases (not built now — outline only)

- **Phase 3** — Trophy Room (CITES status, shipment tracking), Field Journal (issues + articles CMS), Account page (profile, payments, preferences).
- **Phase 4** — PH messaging inbox (realtime), Conservation Score widget with breakdown.
- **Phase 5** — Community (member directory, posts), Admin console (bookings inbox, PH/species CRUD, tier management).
- **Phase 6** — Hardening: rate limits, audit log, OAuth Apple, Microsoft, lockout after failed attempts, real Mapbox topo styling if a token is provided.

---

## Technical notes

- Server work uses TanStack `createServerFn` + `requireSupabaseAuth`, not Edge Functions.
- Protected pages live under `src/routes/_authenticated/portal.*.tsx`; public marketing pages untouched.
- Payments stay on the existing checkout route for now; full Lovable Payments migration can be a later step if you want.
- Map uses Leaflet + OSM (no API key); Mapbox can replace it later when you add a token.
- All UI uses semantic tokens from `src/styles.css`; no hex literals in components.

---

**Confirm and I'll execute Phase 1 now**, then we'll move on to Phase 2. If you want a different ordering (e.g. booking engine before auth/dashboard polish), say the word.
