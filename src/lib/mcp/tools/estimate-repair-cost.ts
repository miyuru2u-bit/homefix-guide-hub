import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { APPLIANCES, REGIONS, estimateRepair } from "@/lib/calculator-data";

export default defineTool({
  name: "estimate_repair_cost",
  title: "Estimate appliance repair cost",
  description:
    "Estimate a US appliance repair cost (parts + labor) by appliance, symptom, and region. Returns low/avg/high in USD, both region-adjusted and national.",
  inputSchema: {
    appliance: z
      .enum(["refrigerator", "washer", "dryer", "dishwasher", "oven"])
      .describe("Appliance id"),
    symptom: z.string().describe("Symptom id — call this tool with no symptom to see the list first, or omit to receive available options"),
    region: z
      .enum(["northeast", "west", "midwest", "south", "mountain", "rural"])
      .optional()
      .describe("US region (defaults to national average)"),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ appliance, symptom, region }) => {
    const app = APPLIANCES.find((a) => a.id === appliance);
    if (!app) return { content: [{ type: "text", text: `Unknown appliance ${appliance}` }], isError: true };
    const sym = app.symptoms.find((s) => s.id === symptom);
    if (!sym) {
      return {
        content: [
          {
            type: "text",
            text: `Unknown symptom '${symptom}' for ${appliance}. Available: ${app.symptoms.map((s) => `${s.id} (${s.label})`).join(", ")}`,
          },
        ],
        isError: true,
      };
    }
    const mult = region ? (REGIONS.find((r) => r.id === region)?.multiplier ?? 1) : 1;
    const est = estimateRepair(sym, mult);
    const payload = {
      appliance: app.label,
      symptom: sym.label,
      region: region ?? "national",
      estimateUSD: est,
      guideUrl: `https://whatrepaircosts.com/blog/${app.guideSlug}`,
    };
    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload,
    };
  },
});
