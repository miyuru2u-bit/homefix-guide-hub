# Appliance Helper Hub

Build a fast, SEO-friendly, AdSense-safe blog website called "Home Appliance Cost Guide"

in the home warranty + appliance repair cost niche, targeting US homeowners who are

deciding whether to repair, replace, or warranty-cover their appliances.

═══════════════════════════════

TECH STACK

═══════════════════════════════

- React + Vite + Tailwind CSS

- React Router for clean, descriptive URLs (e.g. /blog/refrigerator-repair-cost)

- Articles stored as Markdown files with frontmatter (simple to start; structure it

  so it could later migrate to a Supabase CMS without rewriting components)

- Light theme, content-first, minimal, fast-loading, fully mobile responsive

═══════════════════════════════

PAGES & ROUTES

═══════════════════════════════

- /                     Homepage: hero, featured articles, category grid, latest posts

- /blog                 Paginated list of all articles with thumbnails + excerpts

- /blog/:slug           Individual article page (template below)

- /category/:category   Category archive pages

- /about                About page

- /contact              Contact page (simple form)

- /privacy-policy       Privacy policy (required for AdSense)

- /terms                Terms of service

- /disclaimer           Disclaimer (repair safety + affiliate)

- /sitemap.xml          Auto-generated sitemap

- /robots.txt           Crawl rules

═══════════════════════════════

CONTENT CATEGORIES

═══════════════════════════════

Repair vs Replace · Repair Cost Guides · Appliance Error Codes ·

Home Warranty Guides · Buyer Guides & Comparisons

═══════════════════════════════

ARTICLE FRONTMATTER (per Markdown post)

═══════════════════════════════

title (≤60 chars), slug (clean/keyword-based), metaDescription (≤155 chars),

category, tags[], date, author, image (with alt text), faq[] (question/answer pairs)

═══════════════════════════════

ARTICLE PAGE TEMPLATE (reusable component)

═══════════════════════════════

Render every article in this order:

1. Breadcrumbs

2. Single H1 (keyword-focused, one per page)

3. Quick-answer box (highlighted callout, 40–60 word summary)

4. Cost/summary table (styled, responsive)

5. H2 sections: common causes / breakdown

6. DIY checks section (with visible safety warnings for gas/electrical)

7. "When to call a pro" section

8. "Repair vs replace decision" section

9. "Warranty coverage notes" section

10. FAQ section (accordion, wired to FAQPage schema)

11. Related articles (internal links)

12. Disclaimer note at the bottom

Reserve empty ad-slot placeholders at: below the intro, mid-article (~50% scroll),

and a desktop sidebar. Leave them empty for now (no ad code yet).

═══════════════════════════════

SEO REQUIREMENTS (critical)

═══════════════════════════════

- Per-page dynamic <title> and <meta description> (use react-helmet or equivalent)

- Open Graph + Twitter card tags

- JSON-LD structured data: Article, FAQPage, BreadcrumbList

- Auto-generated sitemap.xml and robots.txt

- Canonical tags on every page

- Semantic HTML: exactly one H1, ordered H2/H3

- Clean URLs, no query strings

- Internal linking module (related posts)

- Breadcrumbs on all article/category pages

- Lazy-loaded, WebP images

- Mobile-first responsive layout

IMPORTANT: Because this is a React/Vite SPA, client-side rendering hurts SEO.

Implement pre-rendering / static generation for all blog and category pages so

content and meta tags are crawlable in the initial HTML.

═══════════════════════════════

ADSENSE-SAFE DESIGN RULES

═══════════════════════════════

- Clean, original, non-spammy, high-quality UX

- Clear navigation + visible category structure

- Reserved (empty) ad slots only — no AdSense code until approved

- No layout-shift ads, no accidental-click placements, no above-the-fold overload

- Footer links to About, Contact, Privacy, Terms, Disclaimer on every page

═══════════════════════════════

DESIGN / UX

═══════════════════════════════

Clean and minimal, readable typography, generous white space, fast loading,

light theme, prominent search or category navigation, and a consistent header/footer.

Start by scaffolding the homepage, /blog list, the article template, and the five

category pages. Seed 2–3 placeholder Markdown articles so I can preview the template,

then we'll add the real content and legal pages.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://homefix-guide-hub.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b0d2a54c-58ef-4f51-ba13-34c0d5b0ae7e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
