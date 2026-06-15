import { useState } from "react";
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

  if (headings.length === 0) return null;

  if (variant === "sidebar") {
    return (
      <nav aria-label="Table of contents">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          In this guide
        </p>
        <ul className="space-y-2 text-sm">
          {headings.map((t) => (
            <li key={t.id} className={t.level === 3 ? "pl-3" : ""}>
              <a href={`#${t.id}`} className="text-ink-soft hover:text-primary">
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
                className="text-ink-soft hover:text-primary hover:underline"
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
