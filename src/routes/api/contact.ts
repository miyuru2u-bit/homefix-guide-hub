import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const CONTACT_TO = "miyuru2u@gmail.com";
const GATEWAY_URL = "https://connector-gateway.lovable.dev/resend";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  topic: z.string().trim().min(1).max(100),
  message: z.string().trim().min(1).max(5000),
});

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let payload: unknown;
        try {
          payload = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }
        const parsed = schema.safeParse(payload);
        if (!parsed.success) {
          return Response.json({ error: "Invalid input" }, { status: 400 });
        }
        const { name, email, topic, message } = parsed.data;

        const lovableKey = process.env.LOVABLE_API_KEY;
        const resendKey = process.env.RESEND_API_KEY;
        if (!lovableKey || !resendKey) {
          console.error("Email service not configured");
          return Response.json({ error: "Email service unavailable" }, { status: 500 });
        }

        const html = `
          <h2>New contact form submission</h2>
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <p><strong>Topic:</strong> ${escapeHtml(topic)}</p>
          <p><strong>Message:</strong></p>
          <pre style="white-space:pre-wrap;font-family:inherit">${escapeHtml(message)}</pre>
        `;

        try {
          const res = await fetch(`${GATEWAY_URL}/emails`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${lovableKey}`,
              "X-Connection-Api-Key": resendKey,
            },
            body: JSON.stringify({
              from: "Contact Form <onboarding@resend.dev>",
              to: [CONTACT_TO],
              reply_to: email,
              subject: `[Contact] ${topic} — ${name}`,
              html,
            }),
          });
          if (!res.ok) {
            const body = await res.text();
            console.error("Resend send failed", res.status, body);
            return Response.json({ error: "Failed to send message" }, { status: 502 });
          }
          return Response.json({ ok: true });
        } catch (err) {
          console.error("Contact send error", err);
          return Response.json({ error: "Failed to send message" }, { status: 500 });
        }
      },
    },
  },
});
