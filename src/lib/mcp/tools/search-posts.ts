import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { getAllPosts } from "@/lib/content";

export default defineTool({
  name: "search_posts",
  title: "Search articles",
  description:
    "Full-text search across articles on Home Appliance Cost Guide. Matches title, meta description, tags, and body text (case-insensitive).",
  inputSchema: {
    query: z.string().trim().min(2).describe("Search query"),
    limit: z.number().int().min(1).max(50).optional().describe("Max results (default 10)"),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ query, limit }) => {
    const q = query.toLowerCase();
    const hits = getAllPosts()
      .map((p) => {
        const hay = `${p.title} ${p.metaDescription} ${p.tags.join(" ")} ${p.excerpt} ${p.html.replace(/<[^>]+>/g, " ")}`.toLowerCase();
        const idx = hay.indexOf(q);
        return idx === -1 ? null : { post: p, idx };
      })
      .filter((x): x is { post: ReturnType<typeof getAllPosts>[number]; idx: number } => x !== null)
      .sort((a, b) => a.idx - b.idx)
      .slice(0, limit ?? 10)
      .map(({ post }) => ({
        slug: post.slug,
        title: post.title,
        category: post.category,
        metaDescription: post.metaDescription,
        url: `https://whatrepaircosts.com/blog/${post.slug}`,
      }));
    return {
      content: [{ type: "text", text: JSON.stringify(hits, null, 2) }],
      structuredContent: { results: hits, count: hits.length },
    };
  },
});
