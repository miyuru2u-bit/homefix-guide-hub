import { createFileRoute } from "@tanstack/react-router";
import { getAllPosts } from "@/lib/content";
import { PostCard } from "@/components/blog/PostCard";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";

export const Route = createFileRoute("/blog/")({
  loader: () => getAllPosts(),
  head: ({ loaderData }) => ({
    meta: [
      { title: "All Articles — Home Appliance Cost Guide" },
      {
        name: "description",
        content:
          "Every appliance repair cost guide, error-code reference, and warranty breakdown on Home Appliance Cost Guide.",
      },
      { property: "og:title", content: "All Articles — Home Appliance Cost Guide" },
      { property: "og:description", content: "Repair pricing, error codes, and warranty guides." },
      { property: "og:url", content: "https://whatrepaircosts.com/blog" },
      { property: "og:image", content: "https://whatrepaircosts.com/images/logo-stacked.png" },
      { name: "twitter:image", content: "https://whatrepaircosts.com/images/logo-stacked.png" },
    ],
    links: [{ rel: "canonical", href: "https://whatrepaircosts.com/blog" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "All Articles — Home Appliance Cost Guide",
          url: "https://whatrepaircosts.com/blog",
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
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: (loaderData ?? []).slice(0, 25).map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `https://whatrepaircosts.com/blog/${p.slug}`,
            name: p.title,
          })),
        }),
      },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const posts = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Articles" }]} />
      <header className="mt-6 mb-10 border-b border-border pb-8">
        <h1 className="font-display text-4xl font-semibold text-ink sm:text-5xl">All articles</h1>
        <p className="mt-3 max-w-2xl text-lg text-ink-soft">
          {posts.length} guide{posts.length === 1 ? "" : "s"} on appliance repair costs,
          warranty coverage, and replacement decisions.
        </p>
      </header>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <PostCard key={p.slug} post={p} />
        ))}
      </div>
    </div>
  );
}