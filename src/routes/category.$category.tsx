import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { z } from "zod";
import { getCategory, getPostsByCategory } from "@/lib/content";
import { PostCard } from "@/components/blog/PostCard";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";

const PAGE_SIZE = 12;

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
