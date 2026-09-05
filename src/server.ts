import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

// Start loading the framework handler during module initialization instead of
// waiting for the first request to trigger the dynamic import.
const serverEntryPromise: Promise<ServerEntry> = import(
  "@tanstack/react-start/server-entry"
).then((module) => (module.default ?? module) as ServerEntry);

const EDGE_CACHE_CONTROL =
  "public, max-age=0, s-maxage=3600, stale-while-revalidate=604800, stale-if-error=604800";

async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!body.includes('"unhandled":true') || !body.includes('"message":"HTTPError"')) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function addDeliveryHeaders(request: Request, response: Response, durationMs: number): Response {
  const headers = new Headers(response.headers);
  headers.append("Server-Timing", `app;dur=${durationMs}`);

  const contentType = headers.get("content-type") ?? "";
  const isPublicDocument =
    contentType.includes("text/html") ||
    contentType.includes("application/xml") ||
    contentType.includes("text/xml") ||
    contentType.includes("text/plain");
  const cacheable =
    request.method === "GET" &&
    response.status >= 200 &&
    response.status < 400 &&
    isPublicDocument &&
    !headers.has("set-cookie");

  if (cacheable && !headers.has("cache-control")) {
    headers.set("Cache-Control", EDGE_CACHE_CONTROL);
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const started = Date.now();
    try {
      const handler = await serverEntryPromise;
      const response = await handler.fetch(request, env, ctx);
      const normalized = await normalizeCatastrophicSsrResponse(response);
      return addDeliveryHeaders(request, normalized, Date.now() - started);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: {
          "content-type": "text/html; charset=utf-8",
          "Server-Timing": `app;dur=${Date.now() - started}`,
          "Cache-Control": "no-store",
        },
      });
    }
  },
};
