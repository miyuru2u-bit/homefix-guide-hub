import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { CATEGORIES, getAllPosts } from "@/lib/content";

const BASE_URL = "https://whatrepaircosts.com";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const posts = getAllPosts();
        const staticPaths = [
          { path: "/", priority: "1.0", changefreq: "weekly" as const },
          { path: "/blog", priority: "0.9", changefreq: "daily" as const },
          { path: "/about", priority: "0.5", changefreq: "monthly" as const },
          { path: "/contact", priority: "0.4", changefreq: "yearly" as const },
          { path: "/privacy-policy", priority: "0.3", changefreq: "yearly" as const },
          { path: "/terms", priority: "0.3", changefreq: "yearly" as const },
          { path: "/disclaimer", priority: "0.3", changefreq: "yearly" as const },
        ];

        const categoryEntries = CATEGORIES.map((c) => ({
          path: `/category/${c.slug}`,
          priority: "0.7",
          changefreq: "weekly" as const,
        }));

        const postEntries = posts.map((p) => ({
          path: `/blog/${p.slug}`,
          priority: "0.8",
          changefreq: "monthly" as const,
          lastmod: p.date,
        }));

        const entries = [...staticPaths, ...categoryEntries, ...postEntries];

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
