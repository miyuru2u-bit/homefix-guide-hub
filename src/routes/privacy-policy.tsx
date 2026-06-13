import { createFileRoute } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Home Appliance Cost Guide" },
      { name: "description", content: "How Home Appliance Cost Guide collects, uses, and protects visitor data." },
      { property: "og:title", content: "Privacy Policy" },
      { property: "og:description", content: "How we collect, use, and protect visitor data." },
      { property: "og:url", content: "/privacy-policy" },
    ],
    links: [{ rel: "canonical", href: "/privacy-policy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Privacy Policy" }]} />
      <article className="prose-article mt-8 max-w-none">
        <h1 className="font-display text-4xl font-semibold text-ink">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground">Last updated: June 2026</p>

        <h2>Information we collect</h2>
        <p>
          We collect minimal data needed to run this website. This includes basic analytics
          (pages viewed, approximate location at the country level, device type, referring
          source) and any information you voluntarily submit through our contact form (name,
          email, message).
        </p>

        <h2>How we use information</h2>
        <p>
          Analytics data helps us understand which articles are useful and which need to be
          improved. Contact-form submissions are used solely to respond to your message. We
          do not sell, rent, or share your information with third parties for marketing.
        </p>

        <h2>Cookies and tracking</h2>
        <p>
          We use first-party cookies for basic analytics. If and when we serve advertising
          (such as Google AdSense), third-party advertising cookies may be set. Those vendors
          may use cookies to serve ads based on a visitor's prior visits to this and other
          websites. You can opt out of personalized advertising at{" "}
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
            Google Ads Settings
          </a>{" "}
          or{" "}
          <a href="https://www.aboutads.info/" target="_blank" rel="noopener noreferrer">
            aboutads.info
          </a>
          .
        </p>

        <h2>Third-party services</h2>
        <p>
          We may use trusted third-party services including web analytics platforms,
          advertising networks (such as Google AdSense), and fonts. These services have their
          own privacy policies, which we encourage you to review.
        </p>

        <h2>Children</h2>
        <p>
          This site is not directed at children under 13 and we do not knowingly collect
          information from children.
        </p>

        <h2>Your rights</h2>
        <p>
          You can request access, correction, or deletion of any personal data we hold about
          you by contacting us. We respond to all verifiable requests within 30 days.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          We may update this policy from time to time. Material changes will be reflected in
          the "Last updated" date at the top.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy? <a href="/contact">Get in touch</a>.
        </p>
      </article>
    </div>
  );
}
