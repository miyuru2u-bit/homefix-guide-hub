import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Home Appliance Cost Guide" },
      {
        name: "description",
        content:
          "Independent, brand-agnostic appliance repair and home-warranty guidance for US homeowners. Here's who we are and how we research.",
      },
      { property: "og:title", content: "About — Home Appliance Cost Guide" },
      { property: "og:description", content: "Independent appliance repair and warranty guidance." },
      { property: "og:url", content: "https://whatrepaircosts.com/about" },
      { property: "og:image", content: "https://whatrepaircosts.com/images/logo-stacked.png" },
      { name: "twitter:image", content: "https://whatrepaircosts.com/images/logo-stacked.png" },
    ],
    links: [{ rel: "canonical", href: "https://whatrepaircosts.com/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "About" }]} />
      <article className="prose-article mt-8 max-w-none">
        <h1 className="font-display text-4xl font-semibold text-ink sm:text-5xl">About</h1>
        <p className="lead text-lg text-ink-soft">
          Home Appliance Cost Guide exists for one reason: when an appliance breaks, most
          homeowners have no idea what a fair repair quote looks like — and that vacuum gets
          filled by upsells, scare tactics, and replacement pressure.
        </p>

        <h2>What we cover</h2>
        <p>
          Real US repair pricing for refrigerators, washers, dryers, dishwashers, ovens,
          ranges, and HVAC. Home warranty coverage breakdowns plan-by-plan. Repair-vs-replace
          decisions backed by appliance lifespan data. And practical error-code references
          across major brands.
        </p>

        <h2>How we research</h2>
        <p>
          Our pricing comes from a combination of national service-call data, parts pricing
          from manufacturer-authorized distributors, and ongoing technician interviews.
          Warranty information is sourced from current published plan documents — we re-verify
          coverage details at least quarterly.
        </p>

        <h2>What we don't do</h2>
        <p>
          We do not accept payment for editorial placement. We are not a repair company, a
          warranty broker, or an appliance retailer. When we link to a brand, plan, or
          product, it's because we genuinely think it's worth your attention.
        </p>

        <h2>Have a correction?</h2>
        <p>
          Pricing changes, parts get redesigned, warranty plans update their terms. If you've
          spotted something out of date or simply wrong, please{" "}
          <a href="/contact">let us know</a> — we read every message.
        </p>
      </article>
    </div>
  );
}
