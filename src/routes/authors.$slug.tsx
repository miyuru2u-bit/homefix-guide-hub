import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  getAuthor,
  isAuthorProfileComplete,
  shouldEmitPersonSchema,
} from "@/lib/authors";
import { getPostsByAuthor, formatDate, isValidDate } from "@/lib/content";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";
import { PostCard } from "@/components/blog/PostCard";

export const Route = createFileRoute("/authors/$slug")({
  loader: ({ params }) => {
    const author = getAuthor(params.slug);
    if (!author) throw notFound();
    const posts = getPostsByAuthor(author.slug);
    return { author, posts, complete: isAuthorProfileComplete(author, posts.length) };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Author not found" }, { name: "robots", content: "noindex" }] };
    const { author, posts, complete } = loaderData;
    const origin = "https://whatrepaircosts.com";
    const url = `${origin}/authors/${params.slug}`;
    const description = author.bio
      ? author.bio.slice(0, 158)
      : `Articles credited to ${author.name} on Home Appliance Cost Guide.`;
    const meta: Array<Record<string, string>> = [
      { title: `${author.name} — ${author.role} | Home Appliance Cost Guide` },
      { name: "description", content: description },
      { property: "og:title", content: `${author.name} — ${author.role}` },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary" },
    ];
    // Only indexable with a real biography, real experience, and articles.
    if (!complete) meta.push({ name: "robots", content: "noindex, follow" });

    const scripts: Array<{ type: string; children: string }> = [];
    if (shouldEmitPersonSchema(author, posts.length)) {
      scripts.push({
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: author.name,
          jobTitle: author.role,
          description: author.bio,
          url,
          ...(author.image ? { image: author.image } : {}),
          ...(author.links.length ? { sameAs: author.links.map((l) => l.url) } : {}),
        }),
      });
    }
    return { meta, links: [{ rel: "canonical", href: url }], scripts };
  },
  component: AuthorProfile,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="font-display text-3xl font-semibold text-ink">Author not found</h1>
      <Link to="/authors" className="mt-6 inline-block font-medium text-primary hover:underline">
        ← All authors
      </Link>
    </div>
  ),
});

function AuthorProfile() {
  const { author, posts, complete } = Route.useLoaderData();
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <Breadcrumbs
        items={[{ label: "Home", to: "/" }, { label: "Authors", to: "/authors" }, { label: author.name }]}
      />
      <header className="mt-6 flex items-start gap-5">
        {author.image && (
          <img
            src={author.image}
            alt={`Profile photo of ${author.name}`}
            width={96}
            height={96}
            className="h-24 w-24 flex-none rounded-full object-cover"
          />
        )}
        <div>
          <h1 className="font-display text-3xl font-semibold text-ink sm:text-4xl">{author.name}</h1>
          <p className="mt-1 text-ink-soft">{author.role}</p>
        </div>
      </header>

      {author.bio && <p className="mt-6 leading-relaxed text-ink-soft">{author.bio}</p>}

      <h2 className="mt-8 font-display text-xl font-semibold text-ink">Relevant experience</h2>
      {author.experience ? (
        <p className="mt-2 leading-relaxed text-ink-soft">{author.experience}</p>
      ) : (
        <p className="mt-2 text-ink-soft">
          No individual experience or credentials are claimed for this byline. Articles credited
          here are researched and edited in-house against published pricing and manufacturer
          documentation.
        </p>
      )}

      {author.links.length > 0 && (
        <>
          <h2 className="mt-8 font-display text-xl font-semibold text-ink">Elsewhere</h2>
          <ul className="mt-2 space-y-1 text-sm">
            {author.links.map((l) => (
              <li key={l.url}>
                <a href={l.url} rel="noopener me" className="text-primary underline">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}

      {!complete && (
        <p className="mt-8 rounded-xl border border-border bg-muted p-4 text-sm text-ink-soft">
          This profile is not indexed by search engines yet. It becomes indexable once a real
          biography, verifiable relevant experience, and published articles are all present.
        </p>
      )}

      <h2 className="mt-10 font-display text-2xl font-semibold text-ink">
        Articles by {author.name}
      </h2>
      {posts.length > 0 ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      ) : (
        <p className="mt-2 text-ink-soft">No published articles yet.</p>
      )}

      {posts.length > 0 && isValidDate(posts[0].date) && (
        <p className="mt-6 text-xs text-muted-foreground">
          Most recent article published {formatDate(posts[0].date)}.
        </p>
      )}

      <p className="mt-10 text-sm text-muted-foreground">
        <Link to="/editorial-policy" className="underline hover:text-primary">
          Editorial policy
        </Link>{" "}
        ·{" "}
        <Link to="/how-we-estimate-repair-costs" className="underline hover:text-primary">
          How we estimate repair costs
        </Link>
      </p>
    </div>
  );
}
