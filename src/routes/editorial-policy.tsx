import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";

export const Route = createFileRoute("/editorial-policy")({
  head: () => ({
    meta: [
      { title: "Editorial Policy — Home Appliance Cost Guide" },
      { name: "description", content: "How Home Appliance Cost Guide researches, updates, corrects, and discloses commercial relationships in its content." },
      { property: "og:title", content: "Editorial Policy" },
      { property: "og:description", content: "Our research, corrections, sourcing, and disclosure standards." },
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
        <h1 className="font-display text-4xl font-semibold text-ink sm:text-5xl">Editorial Policy</h1>
        <p className="lead text-lg text-ink-soft">We aim to publish useful, understandable guidance without overstating our evidence or expertise.</p>

        <h2>Research and sourcing</h2>
        <p>Repair-cost content uses published industry research, manufacturer documentation, and parts pricing. Warranty content uses public provider materials and sample contracts. Important factual claims should be supported by article-specific sources. Our full approach is described in <Link to="/how-we-estimate-repair-costs">How We Estimate Appliance Repair Costs</Link>.</p>

        <h2>Authors and reviewers</h2>
        <p>We identify organizational bylines honestly and do not present them as individual experts. We only publish a named reviewer, qualification, interview, or professional credential when it is real and verifiable. See <Link to="/authors">Authors and Reviewers</Link>.</p>

        <h2>Updates and corrections</h2>
        <p>Prices, products, and contracts change. Material updates should include an updated date and a short revision summary. Readers can report errors through the <Link to="/contact">contact page</Link>. We review correction requests and add an editor’s note when a change materially affects the article’s conclusion.</p>

        <h2>Comparisons and rankings</h2>
        <p>Provider comparisons should explain the criteria used and distinguish published facts from editorial judgment. Availability, prices, limits, and exclusions must be checked against current provider documents and may vary by state.</p>

        <h2>Advertising and affiliate disclosure</h2>
        <p>The site may display advertising or use affiliate links. A commercial relationship does not guarantee favorable coverage or ranking. Articles containing affiliate links should disclose that relationship clearly before or near the first commercial recommendation.</p>

        <h2>Safety</h2>
        <p>Content is informational. We do not encourage unqualified work involving gas, refrigerant, or high voltage. Manufacturer instructions and qualified local professionals take priority.</p>
      </article>
    </div>
  );
}
