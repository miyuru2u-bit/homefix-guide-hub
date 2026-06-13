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
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Contact" }]} />
      <header className="mt-8 mb-8">
        <h1 className="font-display text-4xl font-semibold text-ink sm:text-5xl">Contact us</h1>
        <p className="mt-3 text-lg text-ink-soft">
          Corrections, topic ideas, or just want to share a war story? We read everything.
        </p>
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
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="space-y-5 rounded-xl border border-border bg-card p-6"
        >
          <div>
            <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
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
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <button
            type="submit"
            className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Send message
          </button>
        </form>
      )}
    </div>
  );
}
