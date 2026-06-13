import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/blog")({
  component: BlogLayout,
});

function BlogLayout() {
  return <Outlet />;
}
  head: () => ({
    meta: [
      { title: "All Articles — Home Appliance Cost Guide" },
      {
        name: "description",
        content:
          "Every appliance repair cost guide, error-code reference, and warranty breakdown on Home Appliance Cost Guide.",
      },
      { property: "og:title", content: "All Articles — Home Appliance Cost Guide" },
      { property: "og:description", content: "Repair pricing, error codes, and warranty guides." },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const posts = getAllPosts();
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
