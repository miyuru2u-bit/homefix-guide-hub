import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ShieldAlert, Calculator, Scale, SearchCode, ArrowRight } from "lucide-react";
import {
  getPost,
  getCategory,
  getRelatedPosts,
  formatDate,
} from "@/lib/content";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";
import { QuickAnswer } from "@/components/blog/QuickAnswer";
import { CostTable } from "@/components/blog/CostTable";
import { FAQ } from "@/components/blog/FAQ";
import { AdSlot } from "@/components/blog/AdSlot";
import { PostCard } from "@/components/blog/PostCard";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { tagToSlug } from "@/lib/content";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Article not found" }] };
    const origin = "https://whatrepaircosts.com";
    const url = `${origin}/blog/${params.slug}`;
    const defaultImage = `${origin}/images/logo-stacked.png`;
    const absImage = !loaderData.image
      ? defaultImage
      : loaderData.image.startsWith("http")
        ? loaderData.image
        : `${origin}${loaderData.image}`;
    return {
      meta: [
        { title: `${loaderData.title} | Home Appliance Cost Guide` },
        { name: "description", content: loaderData.metaDescription },
        { property: "og:title", content: loaderData.title },
        { property: "og:description", content: loaderData.metaDescription },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: absImage },
        { name: "twitter:image", content: absImage },
        { property: "article:published_time", content: loaderData.date },
        { property: "article:author", content: loaderData.author },
        { property: "article:section", content: loaderData.category },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: loaderData.title,
            description: loaderData.metaDescription,
            image: absImage,
            datePublished: loaderData.date,
            dateModified: loaderData.date,
            author: { "@type": "Organization", name: loaderData.author },
            publisher: {
              "@type": "Organization",
              name: "Home Appliance Cost Guide",
            },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: loaderData.faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${origin}/` },
              { "@type": "ListItem", position: 2, name: "Articles", item: `${origin}/blog` },
              { "@type": "ListItem", position: 3, name: loaderData.title, item: url },
            ],
          }),
        },
      ],
    };
  },
  component: ArticlePage,
  errorComponent: ({ error, reset }) => (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="font-display text-3xl font-semibold text-ink">This article didn't load</h1>
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
      <h1 className="font-display text-3xl font-semibold text-ink">Article not found</h1>
      <p className="mt-3 text-ink-soft">This article doesn't exist or has been moved.</p>
      <Link to="/blog" className="mt-6 inline-block font-medium text-primary hover:underline">
        ← Back to all articles
      </Link>
    </div>
  ),
});

function ArticlePage() {
  const post = Route.useLoaderData() as import("@/lib/content").Post;
  const category = getCategory(post.category);
  const related = getRelatedPosts(post);

  return (
    <article className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <ReadingProgress />
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Articles", to: "/blog" },
          ...(category
            ? [{ label: category.name, to: "/category/$category", params: { category: category.slug } }]
            : []),
          { label: post.title },
        ]}
      />

      <div className="mt-8 lg:grid lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-12">
        <div className="min-w-0">
          {/* Header */}
          <header className="mb-8">
            {category && (
              <Link
                to="/category/$category"
                params={{ category: category.slug }}
                className="mb-3 inline-block text-xs font-semibold uppercase tracking-wider text-accent hover:underline"
              >
                {category.name}
              </Link>
            )}
            <h1 className="font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl md:text-5xl">
              {post.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
              <span>By {post.author}</span>
              <span aria-hidden>·</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
          </header>

          {/* Hero image */}
          <figure className="mb-8 overflow-hidden rounded-xl border border-border bg-muted">
            <img
              src={post.image}
              alt={post.imageAlt}
              width={1280}
              height={800}
              className="aspect-[16/10] w-full object-cover"
            />
          </figure>

          {/* Quick answer */}
          <QuickAnswer text={post.quickAnswer} />

          {/* On-page TOC (mobile/tablet) */}
          <TableOfContents items={post.toc} />

          {/* Ad: below intro */}
          <AdSlot label="Advertisement — Below intro" />

          {/* Cost table */}
          <CostTable rows={post.costTable} caption="Typical US repair costs (parts + labor)" />

          {/* Body */}
          <div
            className="prose-article max-w-none"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          {/* Ad: mid-article */}
          <AdSlot label="Advertisement — Mid-article" />

          {/* Safety callout (always shown for cost/repair posts) */}
          <aside
            className="not-prose my-8 flex gap-3 rounded-xl border border-warning/50 bg-warning/40 p-5"
            role="note"
          >
            <ShieldAlert
              className="mt-0.5 h-5 w-5 flex-none text-warning-foreground"
              aria-hidden
            />
            <div>
              <p className="font-semibold text-warning-foreground">Safety reminder</p>
              <p className="mt-1 text-sm leading-relaxed text-warning-foreground/90">
                Gas, refrigerant, and 240V electrical work should always be handled by a
                licensed technician. Disconnect power and water before opening any panel.
              </p>
            </div>
          </aside>

          {/* FAQ */}
          <FAQ items={post.faq} />

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2 border-t border-border pt-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Tagged:
              </span>
              {post.tags.map((t) => (
                <Link
                  key={t}
                  to="/tag/$tag"
                  params={{ tag: tagToSlug(t) }}
                  className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-ink-soft hover:bg-accent/10 hover:text-accent"
                >
                  #{t}
                </Link>
              ))}
            </div>
          )}

          {/* Related */}
          {related.length > 0 && (
            <section className="mt-12 border-t border-border pt-10">
              <h2 className="mb-6 font-display text-2xl font-semibold text-ink">
                Related guides
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r) => (
                  <PostCard key={r.slug} post={r} />
                ))}
              </div>
            </section>
          )}

          {/* Disclaimer */}
          <p className="mt-10 border-t border-border pt-6 text-xs leading-relaxed text-muted-foreground">
            <strong className="text-ink-soft">Disclaimer:</strong> Pricing reflects US national
            averages as of the publication date and varies by region, brand, and labor rates.
            This article is informational and does not replace professional inspection or repair
            advice. See our full{" "}
            <Link to="/disclaimer" className="underline hover:text-primary">disclaimer</Link>.
          </p>
        </div>

        {/* Sidebar */}
        <aside className="mt-12 hidden lg:mt-0 lg:block">
          <div className="sticky top-24 space-y-6">
            {post.toc.filter((t) => t.level === 2).length > 0 && (
              <div className="rounded-xl border border-border bg-card p-5">
                <TableOfContents items={post.toc} variant="sidebar" />
              </div>
            )}
            <RelatedTools post={post} variant="sidebar" />
            <AdSlot label="Advertisement — Sidebar" className="min-h-[600px]" />
          </div>
        </aside>
      </div>
    </article>
  );
}

type ToolLink = {
  to: "/tools/repair-cost-calculator" | "/tools/repair-or-replace" | "/error-codes";
  title: string;
  desc: string;
  Icon: typeof Calculator;
};

const ALL_TOOLS: ToolLink[] = [
  {
    to: "/tools/repair-cost-calculator",
    title: "Repair Cost Calculator",
    desc: "Estimate parts + labor for your appliance and ZIP region in seconds.",
    Icon: Calculator,
  },
  {
    to: "/tools/repair-or-replace",
    title: "Repair vs Replace Tool",
    desc: "Apply the 50% rule and get a clear keep-or-swap recommendation.",
    Icon: Scale,
  },
  {
    to: "/error-codes",
    title: "Appliance Error Code Lookup",
    desc: "Decode brand-specific error codes and see likely fixes.",
    Icon: SearchCode,
  },
];

function pickToolsForPost(post: import("@/lib/content").Post): ToolLink[] {
  const hay = `${post.slug} ${post.category} ${post.tags.join(" ")} ${post.title}`.toLowerCase();
  const picks = new Set<ToolLink>();
  if (/error|code|e15|f3|oe|4c|f2/.test(hay)) picks.add(ALL_TOOLS[2]);
  if (/repair|cost|price/.test(hay)) picks.add(ALL_TOOLS[0]);
  if (/replace|worth|vs|guide/.test(hay)) picks.add(ALL_TOOLS[1]);
  if (picks.size === 0) ALL_TOOLS.forEach((t) => picks.add(t));
  return Array.from(picks);
}

function trackToolClick(params: {
  toolTitle: string;
  toolPath: string;
  postSlug: string;
  postCategory: string;
  placement: "inline" | "sidebar";
}) {
  if (typeof window === "undefined") return;
  const payload = {
    tool_title: params.toolTitle,
    tool_path: params.toolPath,
    post_slug: params.postSlug,
    post_category: params.postCategory,
    placement: params.placement,
  };
  try {
    const w = window as unknown as {
      gtag?: (...args: unknown[]) => void;
      dataLayer?: unknown[];
      plausible?: (event: string, opts?: { props?: Record<string, unknown> }) => void;
    };
    w.gtag?.("event", "helpful_tool_click", payload);
    w.dataLayer?.push({ event: "helpful_tool_click", ...payload });
    w.plausible?.("Helpful Tool Click", { props: payload });
    window.dispatchEvent(new CustomEvent("helpful_tool_click", { detail: payload }));
    if (import.meta.env.DEV) console.debug("[track] helpful_tool_click", payload);
  } catch {
    // never let tracking break navigation
  }
}

function RelatedTools({
  post,
  variant = "inline",
}: {
  post: import("@/lib/content").Post;
  variant?: "inline" | "sidebar";
}) {
  const tools = pickToolsForPost(post);
  const handleClick = (tool: ToolLink, placement: "inline" | "sidebar") => () =>
    trackToolClick({
      toolTitle: tool.title,
      toolPath: tool.to,
      postSlug: post.slug,
      postCategory: post.category,
      placement,
    });
  if (variant === "sidebar") {
    return (
      <div className="rounded-xl border border-border bg-card p-5">
        <h2 className="mb-1 font-display text-base font-semibold text-ink">Helpful tools</h2>
        <p className="mb-4 text-xs text-ink-soft">Free calculators for this topic.</p>
        <ul className="space-y-2">
          {tools.map((tool) => {
            const { to, title, desc, Icon } = tool;
            return (
            <li key={to}>
              <Link
                to={to}
                onClick={handleClick(tool, "sidebar")}
                data-track="helpful_tool_click"
                data-tool-title={title}
                data-placement="sidebar"
                className="group flex items-start gap-3 rounded-lg border border-transparent p-2 -mx-2 transition-colors hover:border-border hover:bg-accent/5"
              >
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-md bg-accent/10 text-accent">
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-ink group-hover:text-accent">
                    {title}
                  </span>
                  <span className="block text-xs leading-snug text-ink-soft">{desc}</span>
                </span>
              </Link>
            </li>
            );
          })}
        </ul>
      </div>
    );
  }
  return (
    <section className="mt-12 border-t border-border pt-10">
      <h2 className="mb-2 font-display text-2xl font-semibold text-ink">Helpful tools</h2>
      <p className="mb-6 text-sm text-ink-soft">
        Free calculators and lookups to take the next step on this topic.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => {
          const { to, title, desc, Icon } = tool;
          return (
          <Link
            key={to}
            to={to}
            onClick={handleClick(tool, "inline")}
            data-track="helpful_tool_click"
            data-tool-title={title}
            data-placement="inline"
            className="group flex flex-col gap-3 rounded-xl border border-border bg-card p-5 transition-colors hover:border-accent/60 hover:bg-accent/5"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Icon className="h-5 w-5" aria-hidden />
            </span>
            <span className="font-display text-lg font-semibold text-ink">{title}</span>
            <span className="text-sm leading-relaxed text-ink-soft">{desc}</span>
            <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-accent">
              Open tool
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </span>
          </Link>
          );
        })}
      </div>
    </section>
  );
}

