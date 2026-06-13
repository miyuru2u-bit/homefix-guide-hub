import { Link } from "@tanstack/react-router";
import type { Post } from "@/lib/content";
import { getCategory } from "@/lib/content";

export function PostCard({ post }: { post: Post }) {
  const cat = getCategory(post.category);
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:shadow-card">
      <Link
        to="/blog/$slug"
        params={{ slug: post.slug }}
        className="block aspect-[16/10] overflow-hidden bg-muted"
      >
        <img
          src={post.image}
          alt={post.imageAlt}
          loading="lazy"
          width={1280}
          height={800}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        {cat && (
          <Link
            to="/category/$category"
            params={{ category: cat.slug }}
            className="text-xs font-semibold uppercase tracking-wider text-accent hover:underline"
          >
            {cat.name}
          </Link>
        )}
        <Link to="/blog/$slug" params={{ slug: post.slug }}>
          <h3 className="font-display text-xl font-semibold leading-tight text-ink transition-colors group-hover:text-primary">
            {post.title}
          </h3>
        </Link>
        <p className="line-clamp-2 text-sm leading-relaxed text-ink-soft">
          {post.metaDescription}
        </p>
        <div className="mt-auto pt-2 text-xs text-muted-foreground">
          {new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            timeZone: "UTC",
          })}
        </div>
      </div>
    </article>
  );
}
