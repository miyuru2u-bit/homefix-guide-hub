import { defineTool } from "@lovable.dev/mcp-js";
import { CATEGORIES } from "@/lib/content";

export default defineTool({
  name: "list_categories",
  title: "List content categories",
  description:
    "List all article categories on Home Appliance Cost Guide (repair-vs-replace, repair cost guides, buyer guides, home warranty topics, etc.) with slugs and descriptions.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: JSON.stringify(CATEGORIES, null, 2) }],
    structuredContent: { categories: CATEGORIES },
  }),
});
