import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";

export const Route = createFileRoute("/how-we-estimate-repair-costs")({
  head: () => ({
    meta: [
      { title: "How We Estimate Appliance Repair Costs — Home Appliance Cost Guide" },
      { name: "description", content: "How we research and present US appliance repair cost ranges, including sources, limitations, regional factors, and update practices." },
      { property: "og:title", content: "How We Estimate Appliance Repair Costs" },
      { property: "og:description", content: "Our transparent methodology for appliance repair cost ranges." },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://whatrepaircosts.com/how-we-estimate-repair-costs" },
    ],
    links: [{ rel: "canonical", href: "https://whatrepaircosts.com/how-we-estimate-repair-costs" }],
  }),
  component: MethodologyPage,
});

function MethodologyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "How We Estimate Repair Costs" }]} />
      <article className="prose-article mt-8 max-w-none">
        <h1 className="font-display text-4xl font-semibold text-ink sm:text-5xl">How We Estimate Appliance Repair Costs</h1>
        <p className="lead text-lg text-ink-soft">Our figures are educational ranges assembled from published sources. They are not quotes and cannot replace an appliance-specific diagnosis.</p>

        <h2>Sources we use</h2>
        <ul>
          <li>Published repair-industry and consumer cost research.</li>
          <li>Retail pricing from manufacturer-authorized parts distributors.</li>
          <li>Public manufacturer manuals, service bulletins, and error-code documentation.</li>
          <li>Published warranty brochures, sample contracts, and provider websites.</li>
        </ul>
        <p>We do not claim proprietary service-call data or technician interviews unless an article identifies and documents that evidence. Article-specific sources should take priority over this general methodology.</p>

        <h2>How ranges are built</h2>
        <p>We combine typical diagnostic fees, parts prices, and standard labor expectations, then widen the range where brand, region, access, or part availability creates meaningful variation. We compare multiple sources when possible rather than treating one published number as universal.</p>

        <h2>What can change the price</h2>
        <ul>
          <li>Location and local labor rates</li>
          <li>Brand, model, and appliance configuration</li>
          <li>The failed part and diagnostic complexity</li>
          <li>Part availability, shipping, and discontinued components</li>
          <li>Emergency, weekend, rural, or repeat-visit charges</li>
        </ul>

        <h2>Warranty information</h2>
        <p>Warranty prices, limits, exclusions, and availability change frequently and may differ by state. We summarize published terms, but readers must confirm the current contract before buying or filing a claim.</p>

        <h2>Updates and corrections</h2>
        <p>Material reviews should be recorded with a visible updated date and revision summary. If you find an error or have better primary evidence, use our <Link to="/contact">contact page</Link>. See the <Link to="/editorial-policy">editorial policy</Link> for corrections and disclosure practices.</p>

        <h2>Safety and limitations</h2>
        <p>Always obtain a written local quote. Gas, refrigerant, and high-voltage work should be handled by a qualified professional. See our <Link to="/disclaimer">full disclaimer</Link>.</p>
      </article>
    </div>
  );
}
