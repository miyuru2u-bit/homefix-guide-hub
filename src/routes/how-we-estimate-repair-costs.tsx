import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";

export const Route = createFileRoute("/how-we-estimate-repair-costs")({
  head: () => ({
    meta: [
      { title: "How We Estimate Appliance Repair Costs — Home Appliance Cost Guide" },
      {
        name: "description",
        content:
          "Our methodology for researching US appliance repair pricing: sources used, what estimates include and exclude, regional and brand factors, and how often guides are reviewed.",
      },
      { property: "og:title", content: "How We Estimate Appliance Repair Costs" },
      {
        property: "og:description",
        content:
          "The methodology behind our repair cost ranges: sources, inclusions, regional factors, and review cadence.",
      },
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
        <h1 className="font-display text-4xl font-semibold text-ink sm:text-5xl">
          How We Estimate Appliance Repair Costs
        </h1>
        <p className="lead text-lg text-ink-soft">
          Every repair cost range on this site is built the same way: pulled from multiple
          sources, cross-checked against real service calls, and re-reviewed on a schedule.
          This page explains exactly how — so you can weigh our numbers against any quote you
          receive in your own city.
        </p>

        <h2>Why repair costs vary</h2>
        <p>
          Two homeowners can call a technician for the "same" broken refrigerator and receive
          quotes that differ by hundreds of dollars. That's not price gouging — it's the
          reality of appliance service. Repair cost depends on the specific failed part, the
          brand and model, whether the part is stocked locally or has to be ordered, the
          technician's hourly labor rate, the diagnostic time required, and whether the
          appliance is freestanding or built into cabinetry. Regional labor rates alone can
          swing a bill by 30–50%. Our ranges are designed to cover that full spread — not
          promise a single "true" price.
        </p>

        <h2>Sources we use</h2>
        <ul>
          <li>
            <strong>National service-call data.</strong> Aggregated averages from published
            repair-industry reports and consumer research, refreshed annually.
          </li>
          <li>
            <strong>Manufacturer-authorized parts pricing.</strong> Retail parts prices from
            authorized distributors for the most common failed components (pumps, valves,
            heating elements, control boards, compressors).
          </li>
          <li>
            <strong>Independent technician interviews.</strong> Ongoing conversations with
            appliance repair technicians in multiple US regions about diagnostic fees, labor
            hours, and the failures they see most often.
          </li>
          <li>
            <strong>Manufacturer service documentation.</strong> Public repair manuals and
            error-code references for the failure descriptions in our error-code guides.
          </li>
          <li>
            <strong>Published home warranty plan documents.</strong> Current plan brochures
            and sample contracts for coverage, exclusions, and service fees.
          </li>
        </ul>

        <h2>What our estimates include</h2>
        <ul>
          <li>Diagnostic or service-call fee (typically $75–$150)</li>
          <li>Replacement part cost at typical retail</li>
          <li>Standard labor time to complete the repair</li>
          <li>An allowance for tax and minor consumables</li>
        </ul>

        <h2>What our estimates do not include</h2>
        <ul>
          <li>Emergency, weekend, or after-hours service premiums</li>
          <li>Long-distance travel or rural surcharges</li>
          <li>Cosmetic parts (racks, knobs, trim) unless specifically noted</li>
          <li>
            Repeat visits caused by an unrelated failure discovered during the first repair
          </li>
          <li>Removal/disposal of a replaced appliance</li>
        </ul>

        <h2>How brand, region, part availability, and labor affect pricing</h2>
        <p>
          <strong>Brand:</strong> Premium and European brands (Sub-Zero, Miele, Bosch,
          Thermador) tend to run 25–60% higher on parts and labor than mainstream brands.
          Proprietary parts and dealer-network-only service can push repairs further.
        </p>
        <p>
          <strong>Region:</strong> Labor rates in major metros and coastal cities run
          meaningfully higher than in smaller markets. A $150 flat-rate repair in one state
          can be $220 in another.
        </p>
        <p>
          <strong>Part availability:</strong> Parts for appliances 10+ years old, or from
          brands that have exited the market, can be backordered or discontinued entirely —
          adding shipping cost or ruling repair out.
        </p>
        <p>
          <strong>Labor:</strong> Some repairs bill flat-rate, others by the hour. Multi-hour
          jobs (compressor swaps, transmission rebuilds) are where quotes vary most.
        </p>

        <h2>How warranty coverage can change out-of-pocket cost</h2>
        <p>
          If you carry a home warranty, an active manufacturer warranty, or an extended
          appliance warranty, your out-of-pocket cost typically drops to the service call fee
          (commonly $75–$150) up to your plan's cap — sometimes making a $500 repair a $100
          out-of-pocket event. Our repair-cost guides always include a "warranty coverage"
          note so you can see the difference. Coverage details, waiting periods, and
          exclusions vary; always read your specific contract.
        </p>

        <h2>How often articles are reviewed</h2>
        <p>
          Repair cost guides are reviewed at least twice a year, and immediately when a
          major pricing input changes (labor rates, parts pricing, or new manufacturer
          service bulletins). Warranty and provider articles are re-verified quarterly
          against current plan documents. Every article shows a "Last updated" date near the
          top so you know exactly how fresh the numbers are.
        </p>

        <h2>Editorial independence</h2>
        <p>
          We do not accept payment for editorial placement. Cost ranges, brand assessments,
          repair-vs-replace recommendations, and warranty-plan reviews are decided by our
          editorial team independently of any advertising or affiliate relationship. Read
          more in our <Link to="/editorial-policy">editorial policy</Link>.
        </p>

        <h2>Important disclaimer</h2>
        <p>
          Our estimates are informational and reflect typical US pricing at the time of
          publication. Actual costs vary by market, model, technician, and the specific
          failure. Always obtain a written quote before authorizing repair work, and never
          attempt repairs involving refrigerant, gas, or high-voltage components without a
          qualified professional. See our <Link to="/disclaimer">full disclaimer</Link> for
          more.
        </p>

        <p className="mt-8 rounded-xl border border-border bg-muted/40 p-5 text-sm text-ink-soft">
          Have a repair quote that doesn't match our numbers? We'd like to hear about it.{" "}
          <Link to="/contact" className="font-medium text-primary hover:underline">
            Send us a note
          </Link>{" "}
          and we'll take a look.
        </p>
      </article>
    </div>
  );
}
