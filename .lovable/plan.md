
# SEO Audit & Optimization Plan — Home Appliance Cost Guide

The site is already SEO-mature (per-route head, JSON-LD, sitemap server route, robots.txt, canonicals, alt text). This plan audits every area you listed, calls out what's already good, and implements the concrete gaps I found.

## 1. Current state (what's already solid — no changes)

| Area | Status |
|---|---|
| Per-route `<title>` / `<meta description>` | ✅ All routes have unique metadata |
| Canonical tags | ✅ Leaf-only, self-referencing, on domain `whatrepaircosts.com` |
| OG / Twitter tags | ✅ og:title, og:description, og:type, og:url, og:image per post |
| Structured data (JSON-LD) | ✅ WebSite + Organization sitewide; Article + FAQPage + BreadcrumbList per post |
| sitemap.xml | ✅ Dynamic server route with static paths + categories + tags + error codes + posts |
| robots.txt | ✅ Allows all, disallows /api/, references sitemap |
| Friendly URLs | ✅ `/blog/{slug}`, `/category/{slug}`, `/tag/{slug}`, `/error-codes/{brand}/{code}` |
| Alt text on images | ✅ Posts use `imageAlt`, hero + category images labeled |
| Lazy loading | ✅ Category thumbs `loading="lazy"`; hero uses `fetchPriority="high"` |
| RSS feed | ✅ `/rss.xml` linked in `<head>` |
| Font preloading | ✅ Inter + Fraunces preloaded |

## 2. Gaps to fix (this plan will implement)

### A. Meta tags
- **`/blog` (index) missing og:image** — add site logo.
- **`/category/$category` and `/tag/$tag`** — no og:image; add site logo fallback.
- **`__root.tsx` has `og:title` / `og:description` / `og:image`** — these leak into every route because meta with same property dedupes only when leaf overrides. Verified leaves do override title/description, but the root `og:image` is fine as a fallback. Keep, but ensure leaves that don't set og:image inherit intentionally (add explicit og:image on `/blog`, `/category`, `/tag`, `/tools`, `/error-codes`).
- **Homepage `og:image` missing** — add.
- **Tools/error-codes routes** — audit and add missing og:image + og:url where absent.

### B. Heading structure (H1–H6)
- **Single H1 per page** — audit shows post pages have one H1 ✅, but need to verify tools/category/tag pages. Fix any that render multiple H1s or skip levels.
- Ensure prose article HTML uses H2 for TOC sections (already the case via content pipeline).

### C. Structured data additions
- **ItemList JSON-LD** on `/blog`, `/category/$category`, `/tag/$tag` — helps Google render carousels of posts.
- **BreadcrumbList** on category and tag pages ✅ already present.
- **WebPage / CollectionPage** on tools index and error-codes index.
- **HowTo** schema is intentionally NOT added (posts are informational, not step-by-step DIY — HowTo would misrepresent).

### D. Sitemap
- Already comprehensive. **One fix**: `changefreq` for `/rss.xml` is `daily` — lower to `weekly` (matches actual content pace).
- Add `lastmod` on the homepage entry (use latest post date).

### E. robots.txt
- Fine as-is. No changes.

### F. Performance / Core Web Vitals
- **LCP**: hero image already preloaded with `fetchpriority=high` ✅.
- **CLS**: hero and post images have explicit `width`/`height` ✅.
- **JS**: TanStack Start code-splits per-route ✅.
- **Font FOUT**: `font-display` behavior — verify Google Fonts CSS uses `swap`. Add `font-display: swap` guarantee via preloaded woff2 (already preloaded).
- **AdSense scripts**: two AdSense scripts load in root — keep async, but confirm they don't block LCP. No action; already async.
- **No image conversion needed** — hero already `.webp`, post images are `.jpg` (acceptable for photographic content).

### G. Accessibility (addresses failing Lighthouse finding)
- **Low contrast**: audit `text-ink-soft`, `text-muted-foreground` against backgrounds. In the disclaimer and metadata rows, `text-muted-foreground` on `bg-background` typically clears 4.5:1 with shadcn defaults, but I'll spot-check the tokens in `src/styles.css` and darken `--muted-foreground` if it falls below AA.
- Ensure `<main>` present exactly once (currently in `__root.tsx` ✅).
- Icon-only buttons — audit `SiteHeader` for missing `aria-label`.

### H. Internal linking strategy
Current internal linking: PostCard grid, related posts on article pages, category/tag chips, tools sidebar. Gaps:
- **Homepage → categories**: ✅ present.
- **Cross-category linking in articles**: content-pipeline already emits `<a>` in HTML.
- **Add**: "Related categories" block on tag pages showing which categories the tagged posts span.
- **Add**: Footer sitemap columns already exist in `SiteFooter` (assumed) — verify all top-level sections (Tools, Error Codes, Categories, About) are linked.

## 3. Implementation checklist

1. Add `og:image` + `og:url` to routes missing them: `/`, `/blog/`, `/category/$category`, `/tag/$tag`, `/tools/`, `/tools/repair-cost-calculator`, `/tools/repair-or-replace`, `/error-codes/`, `/about`, `/contact`.
2. Add `ItemList` JSON-LD to `/blog/`, `/category/$category`, `/tag/$tag`.
3. Sitemap: lower `/rss.xml` changefreq to `weekly`; add `lastmod` to `/` from latest post.
4. Audit `src/styles.css` for `--muted-foreground` contrast; darken if <4.5:1 on `--background`.
5. Audit `SiteHeader` for icon-only buttons missing `aria-label`.
6. Verify single-H1 on `/tools`, `/error-codes`, `/category`, `/tag` route pages; fix any offenders.
7. Add "Related categories" section to `/tag/$tag` page.

## 4. Out of scope (won't touch without your OK)

- **Google Search Console connection** — one open finding; requires OAuth. Say the word and I'll trigger it.
- **AdSense removal or CMP** — no consent-mode banner exists; if you serve EU traffic you'll want one, but that's a policy decision.
- **New content / keyword expansion** — this plan is technical SEO only.
- **Image regeneration** — existing post images are fine.

## Technical details

- Head changes go in each route's `createFileRoute({ head: () => ({ meta, links, scripts }) })`.
- Sitemap edits go in `src/routes/sitemap[.]xml.ts`.
- Contrast fix goes in `src/styles.css` `:root` and `.dark` blocks (HSL variables consumed by Tailwind v4 tokens).
- No new dependencies. No routing changes. No content pipeline changes.

Approve and I'll implement steps 1–7 in one pass, then mark the accessibility finding fixed for the next SEO rescan.
