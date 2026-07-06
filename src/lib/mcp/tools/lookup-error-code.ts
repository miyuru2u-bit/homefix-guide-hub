import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { ERROR_CODES, findErrorCode } from "@/lib/error-codes-data";

export default defineTool({
  name: "lookup_error_code",
  title: "Look up appliance error code",
  description:
    "Look up an appliance error code (e.g. Bosch dishwasher E15, LG washer OE). Provide brand and code slugs, or omit both to list every documented code.",
  inputSchema: {
    brand: z.string().optional().describe("Brand slug, e.g. 'bosch', 'lg', 'samsung', 'whirlpool', 'ge'"),
    code: z.string().optional().describe("Code slug, e.g. 'e15', 'oe', '4c', 'f2-e2', 'f3'"),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ brand, code }) => {
    if (!brand || !code) {
      const list = ERROR_CODES.map((e) => ({
        brand: e.brand,
        brandSlug: e.brandSlug,
        code: e.code,
        codeSlug: e.codeSlug,
        appliance: e.appliance,
        title: e.title,
      }));
      return {
        content: [{ type: "text", text: JSON.stringify(list, null, 2) }],
        structuredContent: { codes: list },
      };
    }
    const entry = findErrorCode(brand, code);
    if (!entry) {
      return {
        content: [{ type: "text", text: `No error code found for ${brand}/${code}` }],
        isError: true,
      };
    }
    const payload = {
      ...entry,
      url: `https://whatrepaircosts.com/error-codes/${entry.brandSlug}/${entry.codeSlug}`,
      relatedArticleUrl: entry.relatedPostSlug
        ? `https://whatrepaircosts.com/blog/${entry.relatedPostSlug}`
        : undefined,
    };
    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload,
    };
  },
});
