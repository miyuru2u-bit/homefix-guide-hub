import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Home Appliance Cost Guide" },
      {
        name: "description",
        content: "Questions, corrections, or topic suggestions? Get in touch with the Home Appliance Cost Guide team.",
      },
      { property: "og:title", content: "Contact — Home Appliance Cost Guide" },
      { property: "og:description", content: "Send us a question, correction, or topic idea." },
      { property: "og:url", content: "https://whatrepaircosts.com/contact" },
      { property: "og:image", content: "https://whatrepaircosts.com/images/logo-stacked.png" },
      { name: "twitter:image", content: "https://whatrepaircosts.com/images/logo-stacked.png" },
    ],
    links: [{ rel: "canonical", href: "https://whatrepaircosts.com/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      topic: String(fd.get("topic") || ""),
      message: String(fd.get("message") || ""),
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to send message");
      }
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Contact" }]} />
      <header className="mt-8 mb-8">
        <h1 className="font-display text-4xl font-semibold text-ink sm:text-5xl">Contact us</h1>
        <p className="mt-3 text-lg text-ink-soft">
          Corrections, topic ideas, or a partnership question? We read every message and
          typically reply within a few business days.
        </p>
        <ul className="mt-5 space-y-2 text-sm text-ink-soft">
          <li>• <strong>Corrections:</strong> found pricing, warranty, or technical details that need updating — please tell us.</li>
          <li>• <strong>Article suggestions:</strong> a specific appliance, error code, or warranty question you'd like us to cover.</li>
          <li>• <strong>Partnership inquiries:</strong> publishers, technicians, and warranty providers can reach the editorial team here.</li>
        </ul>
        <div className="mt-5 rounded-xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-ink">
          <p className="font-semibold text-destructive">Not an emergency service.</p>
          <p className="mt-1 text-ink-soft">
            We do not provide repair, dispatch, or on-call service. For urgent gas leaks,
            active water leaks, electrical hazards, smoke, or any immediate safety issue,
            stop and contact a qualified local professional or your utility's emergency
            line. In a life-threatening emergency, call 911.
          </p>
        </div>
      </header>

      {sent ? (
        <div className="rounded-xl border border-callout/50 bg-callout/50 p-6 text-callout-foreground">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-accent" />
            <p className="font-semibold">Thanks — your message was received.</p>
          </div>
          <p className="mt-2 text-sm">We'll be in touch within a few business days.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border border-border bg-card p-6">
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              maxLength={100}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              maxLength={255}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label htmlFor="topic" className="mb-1.5 block text-sm font-medium text-ink">
              Topic
            </label>
            <select
              id="topic"
              name="topic"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              <option>General question</option>
              <option>Correction or update</option>
              <option>Article suggestion</option>
              <option>Partnership inquiry</option>
            </select>
          </div>
          <div>
            <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              required
              maxLength={5000}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={submitting}
            className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
          >
            {submitting ? "Sending…" : "Send message"}
          </button>
        </form>
      )}
    </div>
  );
}
