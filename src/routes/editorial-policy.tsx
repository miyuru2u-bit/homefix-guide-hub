import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";

export const Route = createFileRoute("/editorial-policy")({
  head: () => ({
    meta: [
      { title: "Editorial Policy — Home Appliance Cost Guide" },
      {
        name: "description",
        content:
          "Our editorial mission, how topics are selected, how repair cost and warranty content is researched, our corrections process, and our advertising and affiliate disclosure.",
      },
      { property: "og:title", content: "Editorial Policy" },
      {
        property: "og:description",
        content:
          "How we choose topics, research repair costs and warranty guides, and handle corrections and disclosure.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://whatrepaircosts.com/editorial-policy" },
    ],
    links: [{ rel: "canonical", href: "https://whatrepaircosts.com/editorial-policy" }],
  }),
  component: EditorialPolicyPage,
});

function EditorialPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Editorial Policy" }]} />
      <article className="prose-article mt-8 max-w-none">
        <h1 className="font-display text-4xl font-semibold text-ink sm:text-5xl">
          Editorial Policy
        </h1>
        <p className="lead text-lg text-ink-soft">
          Home Appliance Cost Guide is an independent editorial publication. This page
          explains how we choose what to write about, how we research it, and how we handle
          corrections, disclosure, and reader feedback.
        </p>

        <h2>Editorial mission</h2>
        <p>
          When an appliance breaks, most homeowners don't know what a fair repair quote
          looks like. Our mission is simple: publish plain-English, brand-agnostic guidance
          that helps homeowners decide whether to repair, replace, or claim under warranty —
          without the upsell pressure of a service company or the marketing spin of a
          warranty broker.
        </p>

        <h2>How topics are selected</h2>
        <p>
          Topics come from three places: real reader questions submitted through our contact
          form, search demand around specific appliance failures and error codes, and gaps
          we notice in existing coverage of home warranty plans. We deliberately avoid
          topics that duplicate manufacturer marketing or that have no practical decision
          attached to them.
        </p>

        <h2>How repair cost guides are researched</h2>
        <p>
          Repair cost ranges are compiled from national service-call data, retail parts
          pricing from manufacturer-authorized distributors, and ongoing technician
          interviews across multiple US regions. Full methodology, sources, and what our
          estimates include and exclude are documented in{" "}
          <Link to="/how-we-estimate-repair-costs">
            How We Estimate Appliance Repair Costs
          </Link>
          .
        </p>

        <h2>How warranty and provider articles are reviewed</h2>
        <p>
          Warranty coverage, exclusions, service fees, and provider comparisons are sourced
          from current published plan documents (sample contracts, plan brochures, and
          provider websites). We re-verify these details at least quarterly and immediately
          when a provider announces material changes. Because plan terms vary by state and
          by the specific contract you sign, we always tell readers to read their own
          agreement before relying on our summaries.
        </p>

        <h2>Corrections policy</h2>
        <p>
          Pricing changes, warranty plans update, and mistakes happen. If you spot something
          out of date, incorrect, or misleading, please email us through the{" "}
          <Link to="/contact">contact page</Link>. We investigate every correction request,
          respond within a few business days, and update the article with a visible "Last
          updated" date so readers can see when the change was made. If a correction is
          significant, we add an editor's note at the top of the article.
        </p>

        <h2>Affiliate and advertising disclosure</h2>
        <p>
          Some links on this site may be affiliate links, meaning we may earn a commission
          if you click through and complete a purchase or sign-up — at no additional cost to
          you. We may also display advertising from third-party networks (such as Google
          AdSense). Neither affiliate arrangements nor advertising influences which
          providers or products we cover, how we rate them, or the repair and replacement
          recommendations we make.
        </p>

        <h2>No paid editorial placement</h2>
        <p>
          We do not accept payment for editorial mentions, product reviews, brand
          recommendations, or ranking positions. Companies cannot pay to appear in a
          comparison, be added to a "best of" list, or have negative coverage removed. If a
          brand approaches us about a paid partnership, the answer is no.
        </p>

        <h2>Contact for corrections</h2>
        <p>
          For corrections, updated pricing data, technician insights, or article
          suggestions, please use our <Link to="/contact">contact form</Link>. We read every
          message.
        </p>
      </article>
    </div>
  );
}
