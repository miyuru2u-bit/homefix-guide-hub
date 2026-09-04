import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Home Appliance Cost Guide" },
      { name: "description", content: "Independent appliance repair cost, warranty, error-code, and repair-or-replace guidance for US homeowners." },
      { property: "og:title", content: "About — Home Appliance Cost Guide" },
      { property: "og:description", content: "What the site covers, how it is researched, and its limitations." },
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
        <p className="lead text-lg text-ink-soft">Home Appliance Cost Guide publishes educational guidance for people comparing appliance repair, replacement, and warranty options.</p>

        <h2>What we cover</h2>
        <p>We publish repair-cost ranges, repair-or-replace frameworks, warranty explainers, provider comparisons, and common appliance error-code references for US readers.</p>

        <h2>How the content is researched</h2>
        <p>Our editorial team reviews published industry research, manufacturer documentation, authorized-parts pricing, and publicly available warranty materials. We do not claim hands-on technician experience, proprietary service-call data, or private interviews unless that evidence is specifically documented. Read our <Link to="/how-we-estimate-repair-costs">methodology</Link>.</p>

        <h2>What our numbers mean</h2>
        <p>Cost figures are broad educational ranges, not local quotes. Actual prices depend on location, appliance model, diagnosis, labor, and parts availability. Warranty terms vary by state and contract.</p>

        <h2>Editorial independence and disclosure</h2>
        <p>Advertising or affiliate relationships may support the site, but they do not guarantee coverage or a favorable conclusion. Our standards are explained in the <Link to="/editorial-policy">editorial policy</Link>.</p>

        <h2>Corrections</h2>
        <p>If you find inaccurate pricing, an outdated contract term, or an error-code issue, please <Link to="/contact">contact us</Link>. We welcome primary documentation that helps improve an article.</p>

        <h2>Safety</h2>
        <p>This site is informational and does not replace professional diagnosis. Gas, refrigerant, and high-voltage work should be handled by a qualified professional.</p>
      </article>
    </div>
  );
}
