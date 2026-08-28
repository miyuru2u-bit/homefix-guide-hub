import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { CATEGORIES, getAllPosts, getAllTags, isValidDate } from "@/lib/content";
import { ERROR_CODES } from "@/lib/error-codes-data";

const BASE_URL = "https://whatrepaircosts.com";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const posts = getAllPosts();
        const tags = getAllTags();
        const latestPostDate = posts[0]?.date;
        const staticPaths = [
          { path: "/", priority: "1.0", changefreq: "weekly" as const, lastmod: latestPostDate },
          { path: "/blog", priority: "0.9", changefreq: "daily" as const, lastmod: latestPostDate },
          { path: "/tools", priority: "0.8", changefreq: "monthly" as const },
          { path: "/tools/repair-cost-calculator", priority: "0.85", changefreq: "monthly" as const },
          { path: "/tools/repair-or-replace", priority: "0.85", changefreq: "monthly" as const },
          { path: "/error-codes", priority: "0.85", changefreq: "weekly" as const },
          { path: "/rss.xml", priority: "0.3", changefreq: "weekly" as const },
          { path: "/about", priority: "0.5", changefreq: "monthly" as const },
          { path: "/contact", priority: "0.4", changefreq: "yearly" as const },
          { path: "/how-we-estimate-repair-costs", priority: "0.5", changefreq: "yearly" as const },
          { path: "/editorial-policy", priority: "0.5", changefreq: "yearly" as const },
          { path: "/privacy-policy", priority: "0.3", changefreq: "yearly" as const },
          { path: "/terms", priority: "0.3", changefreq: "yearly" as const },
          { path: "/disclaimer", priority: "0.3", changefreq: "yearly" as const },
        ];

        const categoryEntries = CATEGORIES.map((c) => ({
          path: `/category/${c.slug}`,
          priority: "0.7",
          changefreq: "weekly" as const,
        }));

        // Thin tag pages (<3 posts) are noindexed, so keep them out of the sitemap.
        const tagEntries = tags
          .filter((t) => t.count >= 3)
          .map((t) => ({
            path: `/tag/${t.slug}`,
            priority: "0.5",
            changefreq: "weekly" as const,
          }));


        const errorCodeEntries = ERROR_CODES.map((e) => ({
          path: `/error-codes/${e.brandSlug}/${e.codeSlug}`,
          priority: "0.7",
          changefreq: "monthly" as const,
        }));

        const postEntries = posts.map((p) => ({
          path: `/blog/${p.slug}`,
          priority: "0.8",
          changefreq: "monthly" as const,
          lastmod: /^\d{4}-\d{2}-\d{2}/.test(p.date) && !p.date.startsWith("1970-") ? p.date : undefined,
        }));

        const entries = [
          ...staticPaths,
          ...categoryEntries,
          ...tagEntries,
          ...errorCodeEntries,
          ...postEntries,
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            "lastmod" in e && e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            `    <changefreq>${e.changefreq}</changefreq>`,
            `    <priority>${e.priority}</priority>`,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
