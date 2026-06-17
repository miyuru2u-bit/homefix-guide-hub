# Add 3 buyer-guide comparison posts

Create three new markdown files under `src/content/posts/` so they're picked up by the existing `import.meta.glob` loader in `src/lib/content.ts`. No code changes needed — JSON-LD `FAQPage` from `faq[]`, the in-body FAQ section, breadcrumbs, and category routing all already work for any post whose frontmatter matches the schema.

## Files to create

- `src/content/posts/choice-vs-american-home-shield.md`
- `src/content/posts/first-american-vs-american-home-shield.md`
- `src/content/posts/select-vs-choice-home-warranty.md`

## Frontmatter schema (adapted to existing site conventions)

The provided frontmatter uses values that don't match this project's loader. Each file's frontmatter will be normalized:

- `category: "buyer-guides"` — the loader matches on category slug, not display name (the display name `"Buyer Guides & Comparisons"` lives in `CATEGORIES` and resolves automatically). This is what routes `/category/buyer-guides` correctly.
- `image:` — existing posts use a short key resolved through `imageMap` in `src/lib/content.ts`, not a `/images/...` path. I'll reuse the closest existing buyer-guide image key (`best-home-warranty-for-appliances`) so the hero renders. The `imageAlt` from the source copy is preserved.
- `quickAnswer:` — added (required by the article template), filled with the verbatim "Quick answer:" paragraph from each post.
- `costTable: []` — added empty (these are comparison posts, no repair cost table).
- `tags`, `date`, `author`, `title`, `slug`, `metaDescription`, `faq[]` — kept exactly as given.

## Body content

The full body copy is included verbatim, including:

- The intro paragraphs
- The "at a glance" comparison table (rendered as a GFM markdown table)
- All sections (pricing, plans, service fees, claims, contractor network, reviews, which to choose)
- `> **Tip:**` / `> **Watch out:**` callouts as markdown blockquotes
- The "Frequently asked questions" section, repeating each Q (as `**bold**`) and A — matches the existing pattern in posts like `best-home-warranty-for-appliances.md` and satisfies the "render the same Q&As in the body FAQ section" requirement
- "Related articles" list and the disclaimer line

The shared `FAQ` component (`src/components/blog/FAQ.tsx`) also renders `faq[]` as an accordion below the body, and `src/routes/blog.$slug.tsx` already emits `FAQPage` JSON-LD from `faq[]` — both behaviors are automatic.

## What I'm NOT doing

- Not editing `src/lib/content.ts`, `imageMap`, or any route — not needed.
- Not generating new hero images. If you want unique images for these three posts, say so and I'll generate them and wire them into `imageMap`.
- Not touching `routeTree.gen.ts`, sitemap, or RSS — `getAllPosts()` already feeds them, so new posts appear automatically.

## Verification after build

- `/blog/choice-vs-american-home-shield`, `/blog/first-american-vs-american-home-shield`, `/blog/select-vs-choice-home-warranty` render.
- `/category/buyer-guides` lists all three new posts alongside the existing buyer guide.
- Each article page has one `<script type="application/ld+json">` block with `"@type":"FAQPage"` whose `mainEntity` matches the 5 Q&As.
