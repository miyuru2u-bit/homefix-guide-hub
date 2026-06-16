import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ShieldAlert } from "lucide-react";
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
    const absImage = loaderData.image?.startsWith("http")
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
            <AdSlot label="Advertisement — Sidebar" className="min-h-[600px]" />
          </div>
        </aside>
      </div>
    </article>
  );
}
