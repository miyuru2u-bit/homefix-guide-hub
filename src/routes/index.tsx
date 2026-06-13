import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CATEGORIES, getAllPosts } from "@/lib/content";
import { PostCard } from "@/components/blog/PostCard";
import { FeaturedCarousel } from "@/components/blog/FeaturedCarousel";
import heroImg from "@/assets/hero-kitchen.webp";
import catRepairVsReplace from "@/assets/cat-repair-vs-replace.webp";
import catRepairCost from "@/assets/cat-repair-cost.webp";
import catErrorCodes from "@/assets/cat-error-codes.webp";
import catHomeWarranty from "@/assets/cat-home-warranty.webp";
import catBuyerGuides from "@/assets/cat-buyer-guides.webp";

const categoryImages: Record<string, string> = {
  "repair-vs-replace": catRepairVsReplace,
  "repair-cost-guides": catRepairCost,
  "appliance-error-codes": catErrorCodes,
  "home-warranty-guides": catHomeWarranty,
  "buyer-guides": catBuyerGuides,
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Home Appliance Cost Guide — Repair, Replace, Warranty" },
      {
        name: "description",
        content:
          "Honest US repair pricing, home warranty coverage breakdowns, and repair-vs-replace guides for refrigerators, washers, dishwashers, and more.",
      },
      { property: "og:title", content: "Home Appliance Cost Guide" },
      {
        property: "og:description",
        content: "Plain-English repair pricing and warranty guides for US homeowners.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preload", as: "image", href: heroImg, fetchpriority: "high" } as any,
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const posts = getAllPosts();
  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border bg-surface">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 md:items-center md:py-20">
          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-accent">
              Independent · Brand-agnostic · Updated for 2026
            </p>
            <h1 className="font-display text-4xl font-semibold leading-[1.05] text-ink sm:text-5xl md:text-6xl">
              Know what it costs <em className="text-accent not-italic">before</em> the technician arrives.
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-ink-soft">
              Real US repair pricing, home-warranty coverage explained, and clear repair-vs-replace
              decisions for every major appliance in your home.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Browse all articles <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
              <Link
                to="/category/$category"
                params={{ category: "repair-vs-replace" }}
                className="inline-flex items-center rounded-md border border-border bg-background px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-muted"
              >
                Repair or replace?
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-2xl bg-accent/10 [transform:rotate(-1.5deg)]" />
            <img
              src={heroImg}
              alt="Modern kitchen with refrigerator and washing machine"
              width={1600}
              height={1024}
              fetchPriority="high"
              decoding="async"
              className="aspect-[5/4] w-full rounded-xl object-cover shadow-card"
            />
          </div>
        </div>
      </section>

      {/* Featured */}
      {posts.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="font-display text-2xl font-semibold text-ink sm:text-3xl">
              Featured guides
            </h2>
            <Link to="/blog" className="text-sm font-medium text-primary hover:underline">
              All articles →
            </Link>
          </div>
          <FeaturedCarousel posts={posts.slice(0, Math.min(5, posts.length))} />
        </section>
      )}

      {/* Categories */}
      <section className="border-y border-border bg-secondary/30">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="mb-8 font-display text-2xl font-semibold text-ink sm:text-3xl">
            Browse by category
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                to="/category/$category"
                params={{ category: c.slug }}
                className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-accent/50 hover:shadow-soft"
              >
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={categoryImages[c.slug]}
                    alt={c.name}
                    width={800}
                    height={600}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-lg font-semibold text-ink group-hover:text-primary">
                    {c.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{c.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest */}
      {rest.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <h2 className="mb-8 font-display text-2xl font-semibold text-ink sm:text-3xl">
            Latest articles
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
