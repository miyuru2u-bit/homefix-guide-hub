# Complete SEO Plan for whatrepaircosts.com

## Current state (audit)

Strengths already in place:
- Per-route `head()` with title, description, og:* on key routes (`__root.tsx`, `index.tsx`, `error-codes.$brand.$code.tsx`).
- Dynamic `sitemap.xml` server route covering static, category, tag, error-code, and post URLs.
- `robots.txt` with sitemap pointer.
- RSS feed linked from root.
- JSON-LD WebSite on root, FAQPage + BreadcrumbList on error-code pages.
- Hero image preloaded with `fetchPriority="high"`; category images lazy-loaded.

Gaps found:
1. **Canonical tags missing** on most leaf routes (blog list, category, tag, tools, about, contact, legal, error-codes index, blog post detail not verified).
2. **og:image** uses logo on all routes — leaf routes (blog posts, error codes) should use their hero/cover image.
3. **Organization JSON-LD** missing sitewide (only WebSite present, no `url`, no `SearchAction`).
4. **BreadcrumbList JSON-LD** only on error-code detail — should be on blog posts, categories, tags too.
5. **Article JSON-LD** likely missing on blog posts (need to verify).
6. **H1 audit**: every page should have exactly one H1 — needs verification across routes.
7. **Image alt text**: verify all `<img>` have meaningful alt; category images currently use category name only.
8. **Lazy loading**: confirm non-LCP images use `loading="lazy"` + `decoding="async"`.
9. **Internal linking**: blog post pages could add "related posts" by tag/category; category pages could cross-link.
10. **robots.txt** — already good, will leave as-is.
11. **Performance**: hero already preloaded; confirm fonts preloaded (yes, two woff2 preloads).

## Implementation

### 1. Head metadata + canonicals
Add `rel="canonical"` and `og:url` to every leaf route currently missing them:
- `blog.index.tsx`, `blog.$slug.tsx`
- `category.$category.tsx`, `tag.$tag.tsx`
- `error-codes.index.tsx`
- `tools.index.tsx`, `tools.repair-cost-calculator.tsx`, `tools.repair-or-replace.tsx`
- `about.tsx`, `contact.tsx`, `privacy-policy.tsx`, `terms.tsx`, `disclaimer.tsx`

### 2. Per-page og:image
- Blog posts: use post hero/cover image (from frontmatter) for `og:image` + `twitter:image`; `og:type: article`.
- Category pages: use category image.
- Error code pages already self-describe — leave logo fallback.

### 3. Structured data (JSON-LD)
- **Root**: extend WebSite schema with `url`, `potentialAction` (SearchAction). Add Organization schema with `logo`, `sameAs` (if any).
- **Blog post**: add Article + BreadcrumbList.
- **Category / Tag**: add CollectionPage + BreadcrumbList.
- **Error codes index**: add CollectionPage.

### 4. Heading structure
Audit each route component, ensure exactly one `<h1>` per page; demote stray h1s in components (e.g., footer, cards) to h2/h3.

### 5. Images / alt / lazy
- Verify every `<img>` has descriptive alt (not filename, not empty unless decorative).
- Add `loading="lazy"` + `decoding="async"` to non-LCP images that are missing it.
- Ensure width/height present to reserve space (CLS).

### 6. Internal linking
- Blog post: add a "Related articles" block (same category or shared tags, top 3).
- Category page: link to related categories / popular tags.
- Error code detail already links to related post — keep.

### 7. Sitemap
Already comprehensive. Add `lastmod` to category pages when feasible (use newest post date in category). Low priority.

### 8. Performance / Core Web Vitals
- Hero preload — done.
- Fonts preloaded — done.
- Confirm `aspect-*` wrappers on all hero images to avoid CLS.
- Defer non-critical JS — TanStack handles this; nothing to do.

### 9. Accessibility
- Verify icon-only buttons have `aria-label`.
- Verify single `<main>` per page (in `__root.tsx` already).
- Ensure form inputs (search palette, contact) have labels.

## Out of scope (won't change)
- robots.txt (already correct).
- Existing sitemap mechanism (already a dynamic server route covering all routes).
- Visual design / copy.
- Server functions / business logic.

## Verification
- Run `bun run build:dev` after changes.
- Trigger SEO scan and report findings count.
