import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Home Appliance Cost Guide" },
      { name: "description", content: "Terms governing use of the Home Appliance Cost Guide website and content." },
      { property: "og:title", content: "Terms of Service" },
      { property: "og:description", content: "Terms governing use of this website and its content." },
      { property: "og:url", content: "https://whatrepaircosts.com/terms" },
    ],
    links: [{ rel: "canonical", href: "https://whatrepaircosts.com/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Terms of Service" }]} />
      <article className="prose-article mt-8 max-w-none">
        <h1 className="font-display text-4xl font-semibold text-ink">Terms of Service</h1>
        <p className="text-sm text-muted-foreground">Last updated: June 2026</p>

        <h2>Acceptance of terms</h2>
        <p>
          By accessing or using Home Appliance Cost Guide, you agree to these terms. If you
          do not agree, please do not use the site.
        </p>

        <h2>Use of content</h2>
        <p>
          All articles, images, and other content on this site are protected by copyright.
          You may share article links freely and quote brief excerpts with attribution.
          Republishing full articles requires written permission.
        </p>

        <h2>Informational use only</h2>
        <p>
          Content on this site is provided for general informational purposes. It is not
          professional repair, electrical, plumbing, or legal advice. Always consult a
          licensed technician for repair work on your specific appliance.
        </p>

        <h2>No warranties</h2>
        <p>
          The site is provided "as is" without warranties of any kind. We do our best to
          keep pricing and warranty information current, but it changes constantly and
          should be verified before making purchase or repair decisions.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          Home Appliance Cost Guide and its contributors are not liable for any damages
          arising from use of the site or reliance on its content, including but not limited
          to direct, indirect, incidental, or consequential damages.
        </p>

        <h2>External links</h2>
        <p>
          We link to external websites for reference. We are not responsible for the content,
          accuracy, or practices of external sites.
        </p>

        <h2>Changes</h2>
        <p>
          We may update these terms at any time. Continued use of the site after changes
          constitutes acceptance of the revised terms.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms? <a href="/contact">Contact us</a>.
        </p>
      </article>
    </div>
  );
}
