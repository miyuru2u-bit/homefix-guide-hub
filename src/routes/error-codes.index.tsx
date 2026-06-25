import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ERROR_CODES, getAllBrands } from "@/lib/error-codes-data";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";

export const Route = createFileRoute("/error-codes/")({
  head: () => ({
    meta: [
      { title: "Appliance Error Code Lookup — Bosch, LG, Samsung, GE, Whirlpool" },
      {
        name: "description",
        content:
          "Decode appliance error codes by brand: what each code means, what causes it, how to fix it, and what the repair typically costs.",
      },
      { property: "og:title", content: "Appliance Error Code Lookup" },
      { property: "og:description", content: "Decode brand-specific error codes from major appliance brands." },
      { property: "og:url", content: "https://whatrepaircosts.com/error-codes" },
    ],
    links: [{ rel: "canonical", href: "https://whatrepaircosts.com/error-codes" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Appliance Error Code Lookup",
          url: "https://whatrepaircosts.com/error-codes",
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
          ],
        }),
      },
    ],
  }),
  component: ErrorCodesIndex,
});

function ErrorCodesIndex() {
  const [q, setQ] = useState("");
  const [brandFilter, setBrandFilter] = useState<string>("");
  const brands = useMemo(() => getAllBrands(), []);

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return ERROR_CODES.filter((e) => {
      if (brandFilter && e.brand !== brandFilter) return false;
      if (!needle) return true;
      return (
        e.code.toLowerCase().includes(needle) ||
        e.brand.toLowerCase().includes(needle) ||
        e.appliance.toLowerCase().includes(needle) ||
        e.meaning.toLowerCase().includes(needle)
      );
    });
  }, [q, brandFilter]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Error codes" }]} />

      <header className="mt-6 mb-8 border-b border-border pb-8">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent">Lookup</p>
        <h1 className="font-display text-4xl font-semibold text-ink sm:text-5xl">
          Appliance error code lookup
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-ink-soft">
          Decode brand-specific error codes from Bosch, LG, Samsung, GE, Whirlpool and more.
        </p>
      </header>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search e.g. E15, OE, 4C…"
          className="flex-1 min-w-[200px] rounded-lg border border-border bg-background px-3 py-2.5 text-sm"
        />
        <select
          value={brandFilter}
          onChange={(e) => setBrandFilter(e.target.value)}
          className="rounded-lg border border-border bg-background px-3 py-2.5 text-sm"
        >
          <option value="">All brands</option>
          {brands.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

      {results.length === 0 ? (
        <p className="rounded-lg border border-border bg-muted/30 p-6 text-center text-sm text-ink-soft">
          No matching error codes. Try a different brand or search term.
        </p>
      ) : (
        <ul className="divide-y divide-border rounded-xl border border-border bg-card">
          {results.map((e) => (
            <li key={`${e.brandSlug}-${e.codeSlug}`}>
              <Link
                to="/error-codes/$brand/$code"
                params={{ brand: e.brandSlug, code: e.codeSlug }}
                className="flex flex-wrap items-baseline gap-3 px-5 py-4 transition-colors hover:bg-muted/40"
              >
                <span className="inline-flex min-w-[88px] items-center justify-center rounded-md bg-primary/10 px-2 py-1 font-mono text-sm font-semibold text-primary">
                  {e.code}
                </span>
                <span className="font-semibold text-ink">{e.brand} {e.appliance}</span>
                <span className="line-clamp-1 flex-1 text-sm text-ink-soft">{e.meaning}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
