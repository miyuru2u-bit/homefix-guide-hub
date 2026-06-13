import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title: "Disclaimer — Home Appliance Cost Guide" },
      { name: "description", content: "Repair safety, affiliate, and informational disclaimers for Home Appliance Cost Guide." },
      { property: "og:title", content: "Disclaimer" },
      { property: "og:description", content: "Repair safety, affiliate, and informational disclaimers." },
      { property: "og:url", content: "/disclaimer" },
    ],
    links: [{ rel: "canonical", href: "/disclaimer" }],
  }),
  component: DisclaimerPage,
});

function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Disclaimer" }]} />
      <article className="prose-article mt-8 max-w-none">
        <h1 className="font-display text-4xl font-semibold text-ink">Disclaimer</h1>
        <p className="text-sm text-muted-foreground">Last updated: June 2026</p>

        <h2>Repair safety</h2>
        <p>
          Articles on this site describe general repair concepts, common failure modes, and
          typical costs. They are <strong>not step-by-step repair instructions</strong>.
          Appliance repair involves real hazards including electrical shock, gas leaks,
          refrigerant exposure, and physical injury from pressurized or heated components.
        </p>
        <p>
          Always disconnect power and shut off gas or water supply before opening any
          appliance. Refrigerant work in the US is federally regulated (EPA Section 608) and
          must be performed by a certified technician. Gas appliance repair requires a
          licensed gas fitter in most jurisdictions. <strong>When in doubt, call a pro.</strong>
        </p>

        <h2>Pricing accuracy</h2>
        <p>
          Repair costs on this site are US national averages compiled from service-call
          data, manufacturer parts pricing, and technician interviews. Actual pricing varies
          significantly by region, labor rates, brand, and the specific failure. Always
          obtain a written quote before authorizing repair work.
        </p>

        <h2>Warranty information</h2>
        <p>
          Home warranty plan details, coverage, and exclusions change frequently. We do our
          best to keep this information current but coverage you can rely on is the coverage
          spelled out in your specific signed contract. Always read your plan documents.
        </p>

        <h2>Affiliate and advertising disclosure</h2>
        <p>
          Some links on this site may be affiliate links, meaning we may earn a small
          commission if you make a purchase after clicking — at no extra cost to you. We
          only recommend products and services we believe are useful, and affiliate
          relationships never influence editorial content.
        </p>
        <p>
          This site may also display advertising from third-party networks (such as Google
          AdSense). Ads are clearly distinguished from editorial content.
        </p>

        <h2>No professional relationship</h2>
        <p>
          Reading this site does not create a professional or contractual relationship with
          us. We are not your appliance technician, contractor, or insurance broker.
        </p>

        <h2>External links</h2>
        <p>
          We link to external sites for reference. We are not responsible for content,
          pricing, or warranty claims on external sites.
        </p>
      </article>
    </div>
  );
}
