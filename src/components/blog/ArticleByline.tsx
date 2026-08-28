import { Link } from "@tanstack/react-router";
import { AlertTriangle, BadgeCheck, CalendarClock, FileText, UserRound } from "lucide-react";
import { formatDate, isValidDate, type Post } from "@/lib/content";
import { getAuthor, isAuthorProfileComplete } from "@/lib/authors";
import { getPostsByAuthor } from "@/lib/content";

const FACT_CHECK_LABEL: Record<string, string> = {
  reviewed: "Reviewed by a named reviewer",
  "editor-checked": "Checked by our editors",
  unverified: "Not yet fact-checked",
};

export function ArticleByline({ post }: { post: Post }) {
  const author = getAuthor(post.authorSlug);
  const articleCount = author ? getPostsByAuthor(author.slug).length : 0;
  const profileLinkable = !!author && isAuthorProfileComplete(author, articleCount);
  const missing: string[] = [];
  if (!author) missing.push("author is not in the author registry");
  if (author && !author.isPerson) missing.push("byline is organizational — no named person or credentials supplied");
  if (author && !author.experience) missing.push("author has no verified experience on file");
  if (!post.reviewer) missing.push("no reviewer assigned");
  else if (!post.reviewer.qualification) missing.push("reviewer has no qualification on file");

  return (
    <div className="not-prose mt-6 rounded-xl border border-border bg-card p-5 text-sm">
      <div className="flex flex-wrap items-start gap-x-8 gap-y-4">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-accent/10 text-accent">
            <UserRound className="h-4 w-4" aria-hidden />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Written by
            </p>
            <p className="font-medium text-ink">
              {profileLinkable ? (
                <Link
                  to="/authors/$slug"
                  params={{ slug: author!.slug }}
                  className="hover:text-primary hover:underline"
                >
                  {post.author}
                </Link>
              ) : (
                post.author
              )}
            </p>
            {author?.role && <p className="text-xs text-ink-soft">{author.role}</p>}
          </div>
        </div>

        {post.reviewer && (
          <div className="flex items-start gap-3">
            <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-accent/10 text-accent">
              <BadgeCheck className="h-4 w-4" aria-hidden />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Reviewed by
              </p>
              <p className="font-medium text-ink">
                {post.reviewer.profileUrl ? (
                  <a
                    href={post.reviewer.profileUrl}
                    className="hover:text-primary hover:underline"
                    rel="noopener"
                  >
                    {post.reviewer.name}
                  </a>
                ) : (
                  post.reviewer.name
                )}
              </p>
              <p className="text-xs text-ink-soft">
                {[post.reviewer.role, post.reviewer.qualification].filter(Boolean).join(" · ")}
                {isValidDate(post.reviewer.reviewDate)
                  ? ` · Reviewed ${formatDate(post.reviewer.reviewDate)}`
                  : ""}
              </p>
            </div>
          </div>
        )}

        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-accent/10 text-accent">
            <CalendarClock className="h-4 w-4" aria-hidden />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Dates
            </p>
            {isValidDate(post.date) && (
              <p className="text-ink">
                Published <time dateTime={post.date}>{formatDate(post.date)}</time>
              </p>
            )}
            <p className="text-ink">
              Last updated{" "}
              <time dateTime={post.updated ?? post.date}>
                {formatDate(post.updated ?? post.date)}
              </time>
            </p>
          </div>
        </div>
      </div>

      {post.revisionSummary && (
        <p className="mt-4 border-t border-border pt-4 text-ink-soft">
          <span className="font-semibold text-ink">What changed: </span>
          {post.revisionSummary}
        </p>
      )}

      <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-border pt-4 text-xs text-muted-foreground">
        <FileText className="h-3.5 w-3.5" aria-hidden />
        <span>{FACT_CHECK_LABEL[post.factCheckStatus] ?? post.factCheckStatus}.</span>
        <Link to="/how-we-estimate-repair-costs" className="underline hover:text-primary">
          How we estimate repair costs
        </Link>
        <span aria-hidden>·</span>
        <Link to="/editorial-policy" className="underline hover:text-primary">
          Editorial policy
        </Link>
      </p>

      {post.sources.length > 0 && (
        <div className="mt-4 border-t border-border pt-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Sources
          </p>
          <ul className="mt-2 space-y-1 text-xs text-ink-soft">
            {post.sources.map((s) => (
              <li key={s.title}>
                {s.url ? (
                  <a href={s.url} rel="noopener nofollow" className="underline hover:text-primary">
                    {s.title}
                  </a>
                ) : (
                  s.title
                )}
                {s.publisher ? ` — ${s.publisher}` : ""}
              </li>
            ))}
          </ul>
        </div>
      )}

      {import.meta.env.DEV && missing.length > 0 && (
        <div
          className="mt-4 flex gap-2 rounded-lg border border-warning/50 bg-warning/40 p-3 text-xs text-warning-foreground"
          role="note"
        >
          <AlertTriangle className="mt-0.5 h-4 w-4 flex-none" aria-hidden />
          <div>
            <p className="font-semibold">Admin warning — incomplete attribution</p>
            <ul className="mt-1 list-disc pl-4">
              {missing.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
            <p className="mt-1">
              Do not add placeholder people or credentials. Fill these in only with real,
              verifiable names and qualifications.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
