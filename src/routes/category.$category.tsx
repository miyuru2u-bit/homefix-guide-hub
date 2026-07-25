import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { z } from "zod";
import { CATEGORIES, getCategory, getPostsByCategory } from "@/lib/content";
import { PostCard } from "@/components/blog/PostCard";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";

const PAGE_SIZE = 12;

const CATEGORY_INTROS: Record<string, { lede: string; body: string[] }> = {
  "repair-cost-guides": {
    lede: "Real US pricing for appliance repairs — parts, labor, diagnostic fees, and the factors that push a quote higher or lower.",
    body: [
      "Appliance repair pricing is one of the least-transparent services a homeowner pays for. A single quote combines a diagnostic or service-call fee (typically $75–$150), the retail cost of the failed part, and labor priced by the hour or by flat rate. On top of that sit variables most homeowners never see: regional labor rates, part availability, brand tier, and whether the appliance is freestanding or built into cabinetry. Two neighbors can get quotes hundreds of dollars apart on the exact same repair.",
      "Our repair cost guides break each appliance down the same way — what typically fails, what a fair range looks like for each fix, what to check yourself before calling a technician, and when a quote should trigger the 50% rule (if the repair costs more than half of a comparable new appliance, replacement usually wins). Warranty coverage can change the math too: with an active home warranty or manufacturer plan, a $500 repair often drops to a service-call fee.",
      "Use these guides as a baseline for your own market — not a promise of a single 'true' price. Every article shows a Last updated date so you can see how fresh the numbers are, and links to the underlying methodology in How We Estimate Repair Costs.",
    ],
  },
  "home-warranty-guides": {
    lede: "How home warranty coverage actually works — service fees, claim limits, common exclusions, and how to compare plans without the marketing spin.",
    body: [
      "A home warranty is a service contract that pays for repair or replacement of covered systems and appliances when they fail from normal wear and tear. In exchange for a monthly or annual premium, you pay a fixed service fee (usually $75–$150) per claim, and the plan covers the rest — up to a per-item cap and subject to the exclusions in your specific contract. This is very different from homeowners insurance, which covers sudden losses like fire, storm, or theft.",
      "The catch is in the fine print. Every plan has coverage caps, waiting periods, pre-existing-condition exclusions, and a required technician network. Plans that look identical on a price comparison page can behave very differently on an actual claim. Our home warranty guides walk through what standard plans cover, where common denials come from, how to read the fine print before you sign, and how the major providers stack up on real claims — not marketing pages.",
      "If you're deciding whether a plan is worth it for your specific appliance mix, start with Are Home Warranties Worth It for Appliances? and compare it against the individual appliance-coverage explainers listed below.",
    ],
  },
  "repair-vs-replace": {
    lede: "Should you fix it or buy new? The 50% rule, appliance lifespan benchmarks, parts availability, and how warranty coverage tilts the decision.",
    body: [
      "The classic guideline is the 50% rule: if a repair costs more than half the price of a comparable new appliance — and the unit is past the halfway point of its expected lifespan — replacement is usually the smarter financial move. Refrigerators last roughly 10–15 years, dishwashers 8–12, washers 8–12, dryers 10–15, and ranges 13–20. A $400 control-board repair on a 4-year-old dishwasher is almost always worth it. The same repair on a 10-year-old unit almost never is.",
      "Lifespan is only one input. Also weigh repair history (multiple failures in a short window signal broader wear), parts availability (older or discontinued models can become unrepairable overnight), warranty coverage (an active home warranty can turn a replacement decision into a $100 out-of-pocket repair), and energy efficiency (newer appliances often pay back part of their cost in lower utility bills).",
      "The guides in this category work through the math appliance by appliance — refrigerator, dishwasher, washer, dryer, oven — so you can plug in your own numbers and get a decision that's grounded in real cost and expected life, not sales pressure.",
    ],
  },
  "appliance-error-codes": {
    lede: "Decode the codes your appliance is showing — what they usually mean, what to check first, and when the code points to a repair a homeowner should not attempt.",
    body: [
      "Modern appliances announce most failures with an error code on the display or a blink pattern on a status light. These codes are a diagnostic starting point — they tell you which subsystem the appliance's control board thinks has failed, not the exact root cause. An LG washer 'OE' code means 'water not draining' — which could be a clogged filter (free to fix), a kinked hose (free to fix), or a failed drain pump (a $200–$350 repair). The code narrows the search; it doesn't finish it.",
      "Our error-code guides cover the most common codes on major US brands — Samsung, LG, Whirlpool, Bosch, GE — and walk through the likely causes in order from cheapest to most expensive. Wherever it's safe to check something yourself before calling a technician, we say so. When the code points to refrigerant, gas, or high-voltage components, we say to stop and call a qualified pro.",
      "If your error code isn't listed yet, send it to us through the contact page and we'll prioritize adding it.",
    ],
  },
  "buyer-guides": {
    lede: "Brand, warranty, provider, and appliance comparisons for repair-conscious homeowners deciding what to buy — or which plan to cover it with.",
    body: [
      "Buying an appliance is a repair decision in disguise. The brand you choose determines how easy replacement parts will be to source in ten years, whether independent technicians will service it, and how much a typical failure will cost. The warranty or protection plan you buy alongside it — manufacturer extended warranty, retailer plan, or third-party home warranty — determines how much you'll pay out of pocket when something eventually breaks.",
      "The comparisons in this category are brand-agnostic and independent. We compare home warranty providers plan-by-plan (coverage caps, service fees, waiting periods, common exclusions), stack extended appliance warranties against home warranties, and highlight the most and least reliable appliance brands based on failure-rate patterns and parts availability — not marketing budgets.",
      "None of the providers, brands, or products listed in this category paid to appear here. See our editorial policy for the full explanation.",
    ],
  },
};



const searchSchema = z.object({
  page: z.coerce.number().int().min(1).optional().catch(undefined),
});

export const Route = createFileRoute("/category/$category")({
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => ({ page: search.page ?? 1 }),
  loader: ({ params, deps }) => {
    const cat = getCategory(params.category);
    if (!cat) throw notFound();
    const allPosts = getPostsByCategory(cat.slug);
    const totalPages = Math.max(1, Math.ceil(allPosts.length / PAGE_SIZE));
    const page = Math.min(Math.max(1, deps.page), totalPages);
    const start = (page - 1) * PAGE_SIZE;
    const posts = allPosts.slice(start, start + PAGE_SIZE);
    return { cat, posts, page, totalPages, total: allPosts.length };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Category not found" }] };
    const base = `https://whatrepaircosts.com/category/${params.category}`;
    const url = loaderData.page > 1 ? `${base}?page=${loaderData.page}` : base;
    const titleSuffix = loaderData.page > 1 ? ` — Page ${loaderData.page}` : "";
    return {
      meta: [
        { title: `${loaderData.cat.name}${titleSuffix} — Home Appliance Cost Guide` },
        { name: "description", content: loaderData.cat.description },
        { property: "og:title", content: loaderData.cat.name },
        { property: "og:description", content: loaderData.cat.description },
        { property: "og:url", content: url },
        { property: "og:image", content: "https://whatrepaircosts.com/images/logo-stacked.png" },
        { name: "twitter:image", content: "https://whatrepaircosts.com/images/logo-stacked.png" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: loaderData.cat.name,
            description: loaderData.cat.description,
            url: base,
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://whatrepaircosts.com/" },
              { "@type": "ListItem", position: 2, name: "Articles", item: "https://whatrepaircosts.com/blog" },
              { "@type": "ListItem", position: 3, name: loaderData.cat.name, item: base },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: loaderData.posts.map((p, i) => ({
              "@type": "ListItem",
              position: (loaderData.page - 1) * 12 + i + 1,
              url: `https://whatrepaircosts.com/blog/${p.slug}`,
              name: p.title,
            })),
          }),
        },
      ],
    };
  },
  component: CategoryPage,
  errorComponent: ({ error, reset }) => (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="font-display text-3xl font-semibold text-ink">This page didn't load</h1>
      <p className="mt-3 text-ink-soft">{error.message || "Something went wrong."}</p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-6 inline-block font-medium text-primary hover:underline"
      >
        Try again
      </button>
    </div>
  ),
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="font-display text-3xl font-semibold text-ink">Category not found</h1>
      <Link to="/blog" className="mt-6 inline-block font-medium text-primary hover:underline">
        ← All articles
      </Link>
    </div>
  ),
});

function CategoryPage() {
  const { cat, posts, page, totalPages, total } = Route.useLoaderData();
  const params = Route.useParams();
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Articles", to: "/blog" },
          { label: cat.name },
        ]}
      />
      <header className="mt-6 mb-10 border-b border-border pb-8">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent">Category</p>
        <h1 className="font-display text-4xl font-semibold text-ink sm:text-5xl">{cat.name}</h1>
        <p className="mt-3 max-w-2xl text-lg text-ink-soft">{cat.description}</p>
        {total > 0 && (
          <p className="mt-4 text-sm text-ink-soft">
            {total} article{total === 1 ? "" : "s"}
            {totalPages > 1 ? ` · Page ${page} of ${totalPages}` : ""}
          </p>
        )}
      </header>
      {posts.length === 0 ? (
        <p className="text-ink-soft">
          No articles in this category yet.{" "}
          <Link to="/blog" className="text-primary hover:underline">
            Browse all articles →
          </Link>
        </p>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p: typeof posts[number]) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
          {totalPages > 1 && (
            <nav
              aria-label="Pagination"
              className="mt-12 flex items-center justify-between border-t border-border pt-6"
            >
              {page > 1 ? (
                <Link
                  to="/category/$category"
                  params={{ category: params.category }}
                  search={page - 1 === 1 ? {} : { page: page - 1 }}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  ← Previous
                </Link>
              ) : (
                <span className="text-sm text-muted-foreground">← Previous</span>
              )}
              <span className="text-sm text-ink-soft">
                Page {page} of {totalPages}
              </span>
              {page < totalPages ? (
                <Link
                  to="/category/$category"
                  params={{ category: params.category }}
                  search={{ page: page + 1 }}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Next →
                </Link>
              ) : (
                <span className="text-sm text-muted-foreground">Next →</span>
              )}
            </nav>
          )}
        </>
      )}
    </div>
  );
}
