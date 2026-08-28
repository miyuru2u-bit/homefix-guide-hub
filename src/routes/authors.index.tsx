import { createFileRoute, Link } from "@tanstack/react-router";
import { getAllAuthors, isAuthorProfileComplete } from "@/lib/authors";
import { getPostsByAuthor } from "@/lib/content";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";

export const Route = createFileRoute("/authors/")({
  head: () => ({
    meta: [
      { title: "Authors and Reviewers | Home Appliance Cost Guide" },
      {
        name: "description",
        content:
          "Who writes and reviews our appliance repair cost guides, how we attribute articles, and how our editorial review process works.",
      },
      { property: "og:title", content: "Authors and Reviewers" },
      {
        property: "og:description",
        content: "Who writes and reviews our appliance repair cost and home warranty guides.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      // Index gated: this page lists profiles, several of which are not yet
      // complete. Keep it crawlable but do not index thin profile stubs.
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "https://whatrepaircosts.com/authors" }],
  }),
  component: AuthorsIndex,
});

function AuthorsIndex() {
  const authors = getAllAuthors();
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Authors" }]} />
      <h1 className="mt-6 font-display text-3xl font-semibold text-ink sm:text-4xl">
        Authors and reviewers
      </h1>
      <p className="mt-4 text-ink-soft">
        Every article shows who wrote it, who reviewed it (when a reviewer is assigned), when it
        was published, and when it was last materially updated. We do not publish invented
        bylines or credentials — a profile only appears in full once a real biography and
        verifiable experience are on file.
      </p>
      <ul className="mt-8 space-y-4">
        {authors.map((a) => {
          const count = getPostsByAuthor(a.slug).length;
          const complete = isAuthorProfileComplete(a, count);
          return (
            <li key={a.slug} className="rounded-xl border border-border bg-card p-5">
              <h2 className="font-display text-xl font-semibold text-ink">
                {complete ? (
                  <Link to="/authors/$slug" params={{ slug: a.slug }} className="hover:text-primary">
                    {a.name}
                  </Link>
                ) : (
                  a.name
                )}
              </h2>
              <p className="text-sm text-ink-soft">{a.role}</p>
              {a.bio && <p className="mt-2 text-sm leading-relaxed text-ink-soft">{a.bio}</p>}
              <p className="mt-3 text-xs text-muted-foreground">
                {count} article{count === 1 ? "" : "s"}
                {!complete && " · profile not indexed until a biography and verified experience are supplied"}
              </p>
              <Link
                to="/authors/$slug"
                params={{ slug: a.slug }}
                className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
              >
                View profile →
              </Link>
            </li>
          );
        })}
      </ul>
      <p className="mt-10 text-sm text-muted-foreground">
        Read our{" "}
        <Link to="/editorial-policy" className="underline hover:text-primary">
          editorial policy
        </Link>{" "}
        and{" "}
        <Link to="/how-we-estimate-repair-costs" className="underline hover:text-primary">
          cost methodology
        </Link>
        .
      </p>
    </div>
  );
}
