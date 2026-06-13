import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { CATEGORIES, type Post } from "@/lib/content";

export function FeaturedCarousel({ posts }: { posts: Post[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = posts.length;

  useEffect(() => {
    if (paused || count <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 6000);
    return () => clearInterval(id);
  }, [paused, count]);

  if (count === 0) return null;

  const go = (n: number) => setIndex(((n % count) + count) % count);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="overflow-hidden rounded-2xl border border-border bg-card">
        <div
          className="flex transition-transform duration-700 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {posts.map((post) => {
            const cat = CATEGORIES.find((c) => c.slug === post.category);
            return (
              <Link
                key={post.slug}
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="group grid min-w-full shrink-0 grid-cols-1 gap-8 md:grid-cols-2"
              >
                <div className="aspect-[4/3] overflow-hidden bg-muted md:aspect-auto">
                  <img
                    src={post.image}
                    alt={post.imageAlt}
                    width={1280}
                    height={800}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-col justify-center gap-4 p-6 md:p-10">
                  <span className="text-xs font-semibold uppercase tracking-wider text-accent">
                    {cat?.name}
                  </span>
                  <h3 className="font-display text-2xl font-semibold leading-tight text-ink sm:text-3xl">
                    {post.title}
                  </h3>
                  <p className="text-base leading-relaxed text-ink-soft">
                    {post.metaDescription}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Read the guide <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {count > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous featured guide"
            onClick={() => go(index - 1)}
            className="absolute left-3 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 p-2 text-ink shadow-soft backdrop-blur transition-colors hover:bg-background md:flex"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next featured guide"
            onClick={() => go(index + 1)}
            className="absolute right-3 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border border-border bg-background/90 p-2 text-ink shadow-soft backdrop-blur transition-colors hover:bg-background md:flex"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="mt-5 flex justify-center gap-2">
            {posts.map((p, i) => (
              <button
                key={p.slug}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => go(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? "w-8 bg-primary" : "w-2 bg-border hover:bg-ink-soft/40"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
