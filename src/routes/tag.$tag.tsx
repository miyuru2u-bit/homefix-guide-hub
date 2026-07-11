import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getTag, getPostsByTag, getCategory } from "@/lib/content";
import { PostCard } from "@/components/blog/PostCard";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";

export const Route = createFileRoute("/tag/$tag")({
  loader: ({ params }) => {
    const tag = getTag(params.tag);
    if (!tag) throw notFound();
    const posts = getPostsByTag(tag.slug);
    return { tag, posts };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Tag not found" }] };
    const url = `https://whatrepaircosts.com/tag/${params.tag}`;
    const title = `${loaderData.tag.name} — Tagged articles`;
    const count = loaderData.posts.length;
    const thin = count < 3;
    const desc = thin
      ? `${count} article${count === 1 ? "" : "s"} tagged "${loaderData.tag.name}" on Home Appliance Cost Guide.`
      : `Articles tagged with ${loaderData.tag.name}, including repair cost guides, warranty explainers, troubleshooting tips, and repair-vs-replace advice.`;
    const meta: Array<Record<string, string>> = [
      { title: `${title} | Home Appliance Cost Guide` },
      { name: "description", content: desc },
      { property: "og:title", content: title },
      { property: "og:description", content: desc },
      { property: "og:url", content: url },
      { property: "og:image", content: "https://whatrepaircosts.com/images/logo-stacked.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://whatrepaircosts.com/images/logo-stacked.png" },
    ];
    if (thin) meta.push({ name: "robots", content: "noindex, follow" });
    return {
      meta,
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: title,
            description: desc,
            url,
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://whatrepaircosts.com/" },
              { "@type": "ListItem", position: 2, name: "Tag", item: "https://whatrepaircosts.com/blog" },
              { "@type": "ListItem", position: 3, name: loaderData.tag.name, item: url },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: loaderData.posts.slice(0, 25).map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `https://whatrepaircosts.com/blog/${p.slug}`,
              name: p.title,
            })),
          }),
        },
      ],
    };
  },
  component: TagPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="font-display text-3xl font-semibold text-ink">Tag not found</h1>
      <Link to="/blog" className="mt-6 inline-block font-medium text-primary hover:underline">
        ← All articles
      </Link>
    </div>
  ),
});

function TagPage() {
  const { tag, posts } = Route.useLoaderData() as {
    tag: import("@/lib/content").TagSummary;
    posts: import("@/lib/content").Post[];
  };
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Tag" },
          { label: tag.name },
        ]}
      />
      <header className="mt-6 mb-10 border-b border-border pb-8">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent">Tag</p>
        <h1 className="font-display text-4xl font-semibold text-ink sm:text-5xl">#{tag.name}</h1>
        <p className="mt-3 text-lg text-ink-soft">
          {posts.length >= 3
            ? `Articles tagged with ${tag.name}, including repair cost guides, warranty explainers, troubleshooting tips, and repair-vs-replace advice.`
            : `${posts.length} article${posts.length === 1 ? "" : "s"} tagged with this topic.`}
        </p>
      </header>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => <PostCard key={p.slug} post={p} />)}
      </div>
      {(() => {
        const cats = Array.from(new Set(posts.map((p) => p.category)))
          .map((slug) => getCategory(slug))
          .filter((c): c is NonNullable<ReturnType<typeof getCategory>> => Boolean(c));
        if (cats.length === 0) return null;
        return (
          <section className="mt-14 border-t border-border pt-8">
            <h2 className="mb-4 font-display text-xl font-semibold text-ink">Related categories</h2>
            <div className="flex flex-wrap gap-2">
              {cats.map((c) => (
                <Link
                  key={c.slug}
                  to="/category/$category"
                  params={{ category: c.slug }}
                  className="rounded-full border border-border bg-muted px-4 py-1.5 text-sm font-medium text-ink-soft hover:bg-accent/10 hover:text-accent"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </section>
        );
      })()}
    </div>
  );
}
