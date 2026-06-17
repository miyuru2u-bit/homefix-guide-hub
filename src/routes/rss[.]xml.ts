import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { getAllPosts } from "@/lib/content";

const BASE_URL = "https://whatrepaircosts.com";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export const Route = createFileRoute("/rss.xml")({
  server: {
    handlers: {
      GET: async () => {
        const posts = getAllPosts().slice(0, 30);
        const lastBuild = posts[0]?.date ?? new Date().toISOString();

        const items = posts
          .map((p) => {
            const url = `${BASE_URL}/blog/${p.slug}`;
            const pub = new Date(p.date).toUTCString();
            return [
              `  <item>`,
              `    <title>${escapeXml(p.title)}</title>`,
              `    <link>${url}</link>`,
              `    <guid isPermaLink="true">${url}</guid>`,
              `    <pubDate>${pub}</pubDate>`,
              `    <description>${escapeXml(p.metaDescription)}</description>`,
              `    <category>${escapeXml(p.category)}</category>`,
              `  </item>`,
            ].join("\n");
          })
          .join("\n");

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">`,
          `<channel>`,
          `  <title>Home Appliance Cost Guide</title>`,
          `  <link>${BASE_URL}</link>`,
          `  <description>Honest US repair pricing, home warranty breakdowns, and repair-vs-replace guides for major home appliances.</description>`,
          `  <language>en-us</language>`,
          `  <lastBuildDate>${new Date(lastBuild).toUTCString()}</lastBuildDate>`,
          `  <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />`,
          items,
          `</channel>`,
          `</rss>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/rss+xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
