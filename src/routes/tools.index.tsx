import { createFileRoute, Link } from "@tanstack/react-router";
import { Calculator, Scale, AlertTriangle } from "lucide-react";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";

export const Route = createFileRoute("/tools/")({
  head: () => ({
    meta: [
      { title: "Free Appliance Repair Tools — Home Appliance Cost Guide" },
      {
        name: "description",
        content:
          "Free calculators for appliance repair: estimate repair costs by region, decide repair vs replace with the 50% rule, and look up error codes by brand.",
      },
      { property: "og:title", content: "Free Appliance Repair Tools" },
      { property: "og:description", content: "Repair cost calculator, decision tool, and error code lookup." },
      { property: "og:url", content: "https://whatrepaircosts.com/tools" },
      { property: "og:image", content: "https://whatrepaircosts.com/images/logo-stacked.png" },
      { name: "twitter:image", content: "https://whatrepaircosts.com/images/logo-stacked.png" },
    ],
    links: [{ rel: "canonical", href: "https://whatrepaircosts.com/tools" }],
  }),
  component: ToolsHub,
});

const TOOLS = [
  {
    to: "/tools/repair-cost-calculator" as const,
    icon: Calculator,
    title: "Repair Cost Calculator",
    blurb: "Pick your appliance, symptom, and region — get a realistic price range in seconds.",
  },
  {
    to: "/tools/repair-or-replace" as const,
    icon: Scale,
    title: "Repair vs Replace Tool",
    blurb: "Enter age, repair quote, and replacement cost. We apply the 50% rule and give a clear verdict.",
  },
  {
    to: "/error-codes" as const,
    icon: AlertTriangle,
    title: "Error Code Lookup",
    blurb: "Decode brand-specific error codes from Bosch, LG, Samsung, GE, Whirlpool and more.",
  },
];

function ToolsHub() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Tools" }]} />
      <header className="mt-6 mb-10 border-b border-border pb-8">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent">Free tools</p>
        <h1 className="font-display text-4xl font-semibold text-ink sm:text-5xl">
          Decide smarter before you call a technician
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-ink-soft">
          Quick, opinionated tools built from the same data behind our cost guides.
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-3">
        {TOOLS.map((t) => (
          <Link
            key={t.to}
            to={t.to}
            className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-accent/50 hover:shadow-card"
          >
            <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <t.icon className="h-5 w-5" aria-hidden />
            </span>
            <h2 className="font-display text-lg font-semibold text-ink group-hover:text-primary">
              {t.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{t.blurb}</p>
            <span className="mt-4 inline-block text-sm font-medium text-primary group-hover:underline">
              Open tool →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
