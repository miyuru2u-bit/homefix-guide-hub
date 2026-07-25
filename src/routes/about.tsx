import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Home Appliance Cost Guide" },
      {
        name: "description",
        content:
          "Independent, brand-agnostic appliance repair and home-warranty guidance for US homeowners. How we research pricing, our editorial independence, and how to reach us.",
      },
      { property: "og:title", content: "About — Home Appliance Cost Guide" },
      { property: "og:description", content: "Independent appliance repair and warranty guidance for US homeowners." },
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

        <h2>What this site does</h2>
        <p>
          We publish plain-English repair cost ranges, home warranty breakdowns, brand
          comparisons, and repair-vs-replace decision guides for the major appliances found
          in most US homes: refrigerators, washers, dryers, dishwashers, ovens, ranges, and
          HVAC. Every guide is written to help you make one specific decision — repair,
          replace, claim under warranty, or wait.
        </p>

        <h2>Who this site helps</h2>
        <p>
          US homeowners, renters, first-time buyers, and landlords who want an independent
          second opinion before authorizing a repair or signing a warranty contract. If
          you've ever wondered whether a $500 refrigerator repair quote is fair, whether
          your home warranty will actually pay out, or whether it's time to replace a
          10-year-old washer — this site is for you.
        </p>

        <h2>Why repair cost transparency matters</h2>
        <p>
          Appliance repair is one of the least-transparent services a homeowner pays for.
          Quotes vary wildly by market, brand, and technician; parts pricing is opaque; and
          the pressure to "just replace it" often benefits the seller more than the
          homeowner. Publishing realistic cost ranges — with the assumptions behind them —
          gives you a baseline to push back against a quote that doesn't add up.
        </p>

        <h2>How our content is researched</h2>
        <p>
          Repair cost ranges come from national service-call data, retail parts pricing from
          manufacturer-authorized distributors, and ongoing technician interviews across
          multiple US regions. Warranty coverage details come from current published plan
          documents, re-verified quarterly. Full methodology — including what our estimates
          include, what they exclude, and how often we review each article — is documented
          in{" "}
          <Link to="/how-we-estimate-repair-costs" className="font-medium text-primary hover:underline">
            How We Estimate Appliance Repair Costs
          </Link>
          .
        </p>

        <h2>Editorial independence</h2>
        <p>
          We do not accept payment for editorial placement. Cost ranges, brand assessments,
          repair-vs-replace recommendations, and warranty-plan reviews are decided by our
          editorial team independently of any advertising or affiliate relationship. Our
          full{" "}
          <Link to="/editorial-policy" className="font-medium text-primary hover:underline">
            editorial policy
          </Link>{" "}
          spells out how we choose topics, handle corrections, and separate editorial
          content from advertising.
        </p>

        <h2>Advertising and affiliate disclosure</h2>
        <p>
          Some links on this site may be affiliate links, meaning we may earn a commission
          if you click through and complete a sign-up or purchase — at no additional cost to
          you. We may also display advertising from third-party networks such as Google
          AdSense. Neither arrangement influences which brands, plans, or products we cover
          or how we rate them. See the{" "}
          <Link to="/disclaimer" className="font-medium text-primary hover:underline">
            full disclaimer
          </Link>{" "}
          for more.
        </p>

        <h2>Have a correction or a topic idea?</h2>
        <p>
          Pricing changes, parts get redesigned, and warranty plans update their terms. If
          you've spotted something out of date, or want us to cover a specific appliance or
          error code,{" "}
          <Link to="/contact" className="font-medium text-primary hover:underline">
            get in touch
          </Link>{" "}
          — we read every message.
        </p>
      </article>
    </div>
  );
}
