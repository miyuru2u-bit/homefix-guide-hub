import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getTag, getPostsByTag } from "@/lib/content";
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
    const desc = `${loaderData.posts.length} article${loaderData.posts.length === 1 ? "" : "s"} tagged "${loaderData.tag.name}" on Home Appliance Cost Guide.`;
    return {
      meta: [
        { title: `${title} | Home Appliance Cost Guide` },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
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
  const { tag, posts } = Route.useLoaderData();
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Articles", to: "/blog" },
          { label: `#${tag.name}` },
        ]}
      />
      <header className="mt-6 mb-10 border-b border-border pb-8">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent">Tag</p>
        <h1 className="font-display text-4xl font-semibold text-ink sm:text-5xl">#{tag.name}</h1>
        <p className="mt-3 text-lg text-ink-soft">
          {posts.length} article{posts.length === 1 ? "" : "s"} tagged with this topic.
        </p>
      </header>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => <PostCard key={p.slug} post={p} />)}
      </div>
    </div>
  );
}
