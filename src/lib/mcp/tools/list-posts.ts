import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { getAllPosts, getPostsByCategory, getPostsByTag } from "@/lib/content";

export default defineTool({
  name: "list_posts",
  title: "List articles",
  description:
    "List articles on Home Appliance Cost Guide. Optionally filter by category slug or tag slug. Returns slug, title, category, tags, date, and meta description.",
  inputSchema: {
    category: z.string().optional().describe("Category slug (e.g. 'repair-cost-guides')"),
    tag: z.string().optional().describe("Tag slug"),
    limit: z.number().int().min(1).max(100).optional().describe("Max items to return (default 50)"),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ category, tag, limit }) => {
    let posts = category
      ? getPostsByCategory(category)
      : tag
        ? getPostsByTag(tag)
        : getAllPosts();
    posts = posts.slice(0, limit ?? 50);
    const summary = posts.map((p) => ({
      slug: p.slug,
      title: p.title,
      category: p.category,
      tags: p.tags,
      date: p.date,
      metaDescription: p.metaDescription,
      url: `https://whatrepaircosts.com/blog/${p.slug}`,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(summary, null, 2) }],
      structuredContent: { posts: summary, count: summary.length },
    };
  },
});
