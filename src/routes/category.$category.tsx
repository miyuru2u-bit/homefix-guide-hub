import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getCategory, getPostsByCategory } from "@/lib/content";
import { PostCard } from "@/components/blog/PostCard";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";

export const Route = createFileRoute("/category/$category")({
  loader: ({ params }) => {
    const cat = getCategory(params.category);
    if (!cat) throw notFound();
    const posts = getPostsByCategory(cat.slug);
    return { cat, posts };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Category not found" }] };
    const url = `https://whatrepaircosts.com/category/${params.category}`;
    return {
      meta: [
        { title: `${loaderData.cat.name} — Home Appliance Cost Guide` },
        { name: "description", content: loaderData.cat.description },
        { property: "og:title", content: loaderData.cat.name },
        { property: "og:description", content: loaderData.cat.description },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: CategoryPage,
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
  const { cat, posts } = Route.useLoaderData();
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
      </header>
      {posts.length === 0 ? (
        <p className="text-ink-soft">
          No articles in this category yet. <Link to="/blog" className="text-primary hover:underline">Browse all articles →</Link>
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p: typeof posts[number]) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      )}
    </div>
  );
}
