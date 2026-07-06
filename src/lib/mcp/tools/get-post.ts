import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { getPost } from "@/lib/content";

export default defineTool({
  name: "get_post",
  title: "Get article by slug",
  description:
    "Fetch a full article by its slug. Returns title, meta description, quick answer, cost table, FAQ, tags, and the rendered HTML body.",
  inputSchema: {
    slug: z.string().min(1).describe("The article slug, e.g. 'refrigerator-repair-cost-guide'"),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ slug }) => {
    const post = getPost(slug);
    if (!post) {
      return {
        content: [{ type: "text", text: `No article found for slug: ${slug}` }],
        isError: true,
      };
    }
    const payload = {
      slug: post.slug,
      title: post.title,
      metaDescription: post.metaDescription,
      category: post.category,
      tags: post.tags,
      date: post.date,
      author: post.author,
      quickAnswer: post.quickAnswer,
      costTable: post.costTable,
      faq: post.faq,
      excerpt: post.excerpt,
      html: post.html,
      url: `https://whatrepaircosts.com/blog/${post.slug}`,
    };
    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload,
    };
  },
});
