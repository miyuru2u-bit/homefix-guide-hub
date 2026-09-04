import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { CATEGORIES, getAllPosts, getAllTags, isValidDate, getPostsByAuthor } from "@/lib/content";
import { getAllAuthors, isAuthorProfileComplete } from "@/lib/authors";
import { ERROR_CODES } from "@/lib/error-codes-data";

const BASE_URL = "https://whatrepaircosts.com";
type Entry = { path: string; priority: string; changefreq: "daily" | "weekly" | "monthly" | "yearly"; lastmod?: string };

export const Route = createFileRoute("/sitemap.xml")({
  server: { handlers: { GET: async () => {
    const posts = getAllPosts();
    const latest = posts.map((p) => p.updated ?? p.date).filter(isValidDate).sort().at(-1);
    const entries: Entry[] = [
      { path: "/", priority: "1.0", changefreq: "weekly", lastmod: latest },
      { path: "/blog", priority: "0.9", changefreq: "daily", lastmod: latest },
      { path: "/tools", priority: "0.8", changefreq: "monthly" },
      { path: "/tools/repair-cost-calculator", priority: "0.85", changefreq: "monthly" },
      { path: "/tools/repair-or-replace", priority: "0.85", changefreq: "monthly" },
      { path: "/error-codes", priority: "0.85", changefreq: "weekly" },
      { path: "/about", priority: "0.5", changefreq: "monthly" },
      { path: "/authors", priority: "0.4", changefreq: "monthly" },
      { path: "/contact", priority: "0.4", changefreq: "yearly" },
      { path: "/how-we-estimate-repair-costs", priority: "0.5", changefreq: "yearly" },
      { path: "/editorial-policy", priority: "0.5", changefreq: "yearly" },
      { path: "/privacy-policy", priority: "0.3", changefreq: "yearly" },
      { path: "/terms", priority: "0.3", changefreq: "yearly" },
      { path: "/disclaimer", priority: "0.3", changefreq: "yearly" },
      ...CATEGORIES.map((c) => ({ path: `/category/${c.slug}`, priority: "0.7", changefreq: "weekly" as const })),
      ...getAllTags().filter((t) => t.count >= 3).map((t) => ({ path: `/tag/${t.slug}`, priority: "0.5", changefreq: "weekly" as const })),
      ...ERROR_CODES.map((e) => ({ path: `/error-codes/${e.brandSlug}/${e.codeSlug}`, priority: "0.7", changefreq: "monthly" as const })),
      ...getAllAuthors().filter((a) => isAuthorProfileComplete(a, getPostsByAuthor(a.slug).length)).map((a) => ({ path: `/authors/${a.slug}`, priority: "0.4", changefreq: "monthly" as const })),
      ...posts.map((p) => ({ path: `/blog/${p.slug}`, priority: "0.8", changefreq: "monthly" as const, lastmod: isValidDate(p.updated ?? p.date) ? (p.updated ?? p.date) : undefined })),
    ];
    const urls = entries.map((e) => ["  <url>", `    <loc>${BASE_URL}${e.path}</loc>`, e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null, `    <changefreq>${e.changefreq}</changefreq>`, `    <priority>${e.priority}</priority>`, "  </url>"].filter(Boolean).join("\n"));
    return new Response(["<?xml version=\"1.0\" encoding=\"UTF-8\"?>", "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">", ...urls, "</urlset>"].join("\n"), { headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" } });
  } } },
});
