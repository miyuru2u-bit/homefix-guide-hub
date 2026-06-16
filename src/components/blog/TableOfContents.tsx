import { useEffect, useState, useRef } from "react";
import { ChevronDown, List } from "lucide-react";
import type { TocItem } from "@/lib/content";

interface Props {
  items: TocItem[];
  /** When true, render compact card without collapse toggle (for sidebar). */
  variant?: "inline" | "sidebar";
}

export function TableOfContents({ items, variant = "inline" }: Props) {
  const headings = items.filter((t) => t.level === 2 || t.level === 3);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      // Find the first heading that's intersecting and near the top
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

      if (visible.length > 0) {
        setActiveId(visible[0].target.id);
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersection, {
      rootMargin: "-64px 0px -60% 0px",
      threshold: 0,
    });

    // Observe all heading targets in the article body (use getElementById to
    // safely handle IDs that start with digits or contain CSS-special chars).
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [headings.map((h) => h.id).join(",")]);

  if (headings.length === 0) return null;

  const linkClasses = (id: string) =>
    id === activeId
      ? "font-semibold text-primary"
      : "text-ink-soft hover:text-primary";

  if (variant === "sidebar") {
    return (
      <nav aria-label="Table of contents">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          In this guide
        </p>
        <ul className="space-y-2 text-sm">
          {headings.map((t) => (
            <li key={t.id} className={t.level === 3 ? "pl-3" : ""}>
              <a href={`#${t.id}`} className={linkClasses(t.id)}>
                {t.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  return (
    <nav
      aria-label="Table of contents"
      className="not-prose my-6 rounded-xl border border-border bg-card lg:hidden"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
      >
        <span className="flex items-center gap-2 text-sm font-semibold text-ink">
          <List className="h-4 w-4 text-primary" aria-hidden />
          In this guide
          <span className="text-xs font-normal text-muted-foreground">
            ({headings.length})
          </span>
        </span>
        <ChevronDown
          className={`h-4 w-4 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      {open && (
        <ol className="list-decimal space-y-2 border-t border-border px-8 py-4 text-sm marker:text-muted-foreground">
          {headings.map((t) => (
            <li key={t.id} className={t.level === 3 ? "ml-4 list-[lower-alpha]" : ""}>
              <a
                href={`#${t.id}`}
                onClick={() => setOpen(false)}
                className={`${linkClasses(t.id)} hover:underline`}
              >
                {t.text}
              </a>
            </li>
          ))}
        </ol>
      )}
    </nav>
  );
}
