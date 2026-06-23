import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { findErrorCode } from "@/lib/error-codes-data";
import { getPost } from "@/lib/content";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";

export const Route = createFileRoute("/error-codes/$brand/$code")({
  loader: ({ params }) => {
    const entry = findErrorCode(params.brand, params.code);
    if (!entry) throw notFound();
    return entry;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Error code not found" }] };
    const url = `https://whatrepaircosts.com/error-codes/${params.brand}/${params.code}`;
    const desc = loaderData.meaning;
    return {
      meta: [
        { title: `${loaderData.title} — Causes, Fixes, Cost` },
        { name: "description", content: desc },
        { property: "og:title", content: loaderData.title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: `What does ${loaderData.code} mean on a ${loaderData.brand} ${loaderData.appliance.toLowerCase()}?`,
                acceptedAnswer: { "@type": "Answer", text: loaderData.meaning },
              },
              {
                "@type": "Question",
                name: `How do I fix the ${loaderData.brand} ${loaderData.code} error?`,
                acceptedAnswer: { "@type": "Answer", text: loaderData.fixSteps.join(" ") },
              },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://whatrepaircosts.com/" },
              { "@type": "ListItem", position: 2, name: "Error codes", item: "https://whatrepaircosts.com/error-codes" },
              { "@type": "ListItem", position: 3, name: `${loaderData.brand} ${loaderData.code}`, item: url },
            ],
          }),
        },
      ],
    };
  },
  component: ErrorCodeDetail,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <h1 className="font-display text-3xl font-semibold text-ink">Error code not in our database yet</h1>
      <p className="mt-3 text-ink-soft">We're constantly adding new codes. Browse what we have so far.</p>
      <Link to="/error-codes" className="mt-6 inline-block font-medium text-primary hover:underline">
        ← All error codes
      </Link>
    </div>
  ),
});

function ErrorCodeDetail() {
  const e = Route.useLoaderData() as import("@/lib/error-codes-data").ErrorCodeEntry;
  const related = e.relatedPostSlug ? getPost(e.relatedPostSlug) : undefined;

  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Error codes", to: "/error-codes" },
          { label: `${e.brand} ${e.code}` },
        ]}
      />

      <header className="mt-6 mb-8">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded bg-primary/10 px-2 py-1 font-mono font-semibold text-primary">{e.code}</span>
          <span className="text-muted-foreground">{e.brand} · {e.appliance}</span>
        </div>
        <h1 className="font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
          {e.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-ink-soft">{e.meaning}</p>
      </header>

      <section className="mb-8">
        <h2 className="mb-3 font-display text-xl font-semibold text-ink">Common causes</h2>
        <ul className="list-disc space-y-1.5 pl-5 text-ink-soft">
          {e.commonCauses.map((c, i) => <li key={i}>{c}</li>)}
        </ul>
      </section>

      <section className="mb-8 rounded-xl border border-border bg-surface p-6">
        <h2 className="mb-3 font-display text-xl font-semibold text-ink">Fix it step by step</h2>
        <ol className="list-decimal space-y-2 pl-5 text-ink-soft">
          {e.fixSteps.map((s, i) => <li key={i}>{s}</li>)}
        </ol>
      </section>

      <p className="mb-8 text-sm">
        <strong className="text-ink">Typical cost:</strong> <span className="text-ink-soft">{e.costRange}</span>
      </p>

      {related && (
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Read next</p>
          <Link
            to="/blog/$slug"
            params={{ slug: related.slug }}
            className="mt-1 block font-display text-lg font-semibold text-ink hover:text-primary"
          >
            {related.title}
          </Link>
          <p className="mt-1 text-sm text-ink-soft">{related.metaDescription}</p>
        </div>
      )}
    </article>
  );
}
