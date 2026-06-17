## 7 New Features for WhatRepairCosts

A balanced mix across the four focus areas, powered by Lovable Cloud where storage is needed.

### 1. Repair Cost Calculator (Interactive Tool)
A guided form: appliance type → brand → symptom/part → ZIP region → estimated low/avg/high cost with a "national average" comparison bar. Results page includes a CTA to the matching cost-guide article and an affiliate widget for home warranty quotes.
- Data: static JSON pricing matrix in `src/lib/calculator-data.ts` (derived from existing cost guides).
- Route: `/tools/repair-cost-calculator`.
- Saves each calculation to Cloud (`calculations` table) for analytics and "popular estimates" insights.

### 2. Repair vs Replace Decision Tool (Interactive Tool)
Inputs: appliance age, repair quote, replacement cost. Applies the "50% rule" and age-of-appliance multiplier, returns a clear Repair / Replace / Borderline verdict with reasoning and links to the relevant guide.
- Route: `/tools/repair-or-replace`.
- Pure client-side logic, no backend needed.

### 3. Error Code Lookup (Interactive Tool + SEO)
Searchable database of appliance error codes (Bosch E15, LG OE, Samsung 4C, GE F3, Whirlpool F2 E2, etc.) with brand/model filters. Each code gets its own SEO route with JSON-LD `FAQPage` schema.
- Route: `/error-codes` (index) and `/error-codes/$brand/$code` (detail).
- Seeded from existing error-code posts; expandable via a Cloud `error_codes` table.

### 4. Newsletter Signup + Reader Account (Engagement)
Email/password + Google auth via Lovable Cloud. Signed-in users get:
- Bookmark articles (saved to `bookmarks` table).
- "My Reading List" page at `/account/saved`.
- Newsletter opt-in stored on profile; weekly digest is out of scope for now (just capture).
- Inline "Sign in to save" CTA on each article (no redirect-walls on public content).

### 5. Article Search + Related Posts (Engagement + SEO)
- Header search box opens a command-palette (cmd-k style) that fuzzy-matches titles, categories, and tags client-side from a prebuilt index.
- Each article gets a "Related guides" block (3 posts) computed by shared category + tag overlap.
- Reading progress bar at the top of every article.

### 6. Lead-Gen Quote Form (Monetization)
"Get a free home warranty quote" form on warranty articles and the calculator results page. Captures name, email, ZIP, appliance count → stores in `warranty_leads` table → shows thank-you with affiliate redirect.
- Used as a monetization funnel; can later be wired to an affiliate network.
- Honeypot + rate-limit (server function) for spam protection.

### 7. SEO & Content Ops Upgrades
- JSON-LD `Article` schema on every blog post (headline, datePublished, author, image).
- JSON-LD `BreadcrumbList` on category and article pages.
- JSON-LD `FAQPage` on posts containing the FAQ component.
- RSS feed at `/rss.xml` generated from posts.
- Tag pages at `/tag/$tag` (currently only categories exist).
- Improved `sitemap.xml`: include lastmod from post frontmatter, add tag and tool routes.
- Author byline + `/about` link on each article.

---

### Technical Notes

**Lovable Cloud tables (with RLS + GRANTs):**
- `profiles` (id, display_name, newsletter_opt_in) — created via `handle_new_user` trigger.
- `bookmarks` (id, user_id, post_slug, created_at) — RLS scoped to `auth.uid()`.
- `calculations` (id, user_id nullable, appliance, brand, region, estimate, created_at) — anon-insertable for analytics.
- `warranty_leads` (id, email, zip, appliance_count, source_url, created_at) — `TO anon` INSERT only; admin-only SELECT via `has_role`.
- `error_codes` (id, brand, code, appliance, meaning, common_causes, fix_steps) — `TO anon` SELECT.

**Auth:** Email/password + Google (via `lovable.auth.signInWithOAuth`). Provider enabled with `configure_social_auth`.

**Routes:** All public routes stay top-level for shareability; only `/account/*` lives under `_authenticated/`.

**Server functions:** Lead submission (`submitWarrantyLead`), bookmark toggle (`toggleBookmark`), calculation logging (`logCalculation`) — all `createServerFn` with proper input validation. No edge functions.

### Suggested Build Order
1. SEO & Content Ops (#7) — lowest risk, biggest immediate organic lift.
2. Search + Related Posts (#5) — improves engagement on existing traffic.
3. Repair Cost Calculator (#1) + Repair vs Replace (#2) — pure frontend tools.
4. Error Code Lookup (#3) — needs Cloud table seed.
5. Enable Lovable Cloud → Newsletter/Accounts (#4).
6. Lead-Gen Quote Form (#6) — needs Cloud + the calculator results page as a host.

Would you like me to start with #7 (SEO ops) or jump to a specific feature?