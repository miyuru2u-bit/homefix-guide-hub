import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { getAllPosts, CATEGORIES } from "@/lib/content";

type Item =
  | { kind: "post"; title: string; subtitle: string; slug: string }
  | { kind: "category"; title: string; subtitle: string; slug: string }
  | { kind: "tool"; title: string; subtitle: string; to: string };

const TOOL_ITEMS: Item[] = [
  { kind: "tool", title: "Repair Cost Calculator", subtitle: "Estimate parts + labor by region", to: "/tools/repair-cost-calculator" },
  { kind: "tool", title: "Repair vs Replace Decision Tool", subtitle: "Apply the 50% rule in seconds", to: "/tools/repair-or-replace" },
  { kind: "tool", title: "Appliance Error Code Lookup", subtitle: "Decode brand-specific error codes", to: "/error-codes" },
];

export function SearchPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const allItems = useMemo<Item[]>(() => {
    const posts: Item[] = getAllPosts().map((p) => ({
      kind: "post",
      title: p.title,
      subtitle: p.metaDescription,
      slug: p.slug,
    }));
    const cats: Item[] = CATEGORIES.map((c) => ({
      kind: "category",
      title: c.name,
      subtitle: c.description,
      slug: c.slug,
    }));
    return [...TOOL_ITEMS, ...cats, ...posts];
  }, []);

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return allItems.slice(0, 8);
    return allItems
      .filter(
        (i) =>
          i.title.toLowerCase().includes(needle) ||
          i.subtitle.toLowerCase().includes(needle),
      )
      .slice(0, 12);
  }, [q, allItems]);

  useEffect(() => {
    if (open) {
      setQ("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  useEffect(() => setActive(0), [q]);

  if (!open) return null;

  const go = (item: Item) => {
    onClose();
    if (item.kind === "post") navigate({ to: "/blog/$slug", params: { slug: item.slug } });
    else if (item.kind === "category")
      navigate({ to: "/category/$category", params: { category: item.slug } });
    else navigate({ to: item.to });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-4 pt-[10vh] backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-xl border border-border bg-card shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === "Escape") onClose();
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setActive((a) => Math.min(results.length - 1, a + 1));
          }
          if (e.key === "ArrowUp") {
            e.preventDefault();
            setActive((a) => Math.max(0, a - 1));
          }
          if (e.key === "Enter") {
            e.preventDefault();
            if (results[active]) go(results[active]);
          }
        }}
      >
        <div className="flex items-center gap-2 border-b border-border px-4">
          <Search className="h-4 w-4 text-muted-foreground" aria-hidden />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search articles, categories, tools…"
            className="flex-1 bg-transparent py-3.5 text-sm text-ink outline-none placeholder:text-muted-foreground"
          />
          <button
            type="button"
            aria-label="Close search"
            onClick={onClose}
            className="rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-ink"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>
        <ul className="max-h-[60vh] overflow-y-auto py-1">
          {results.length === 0 && (
            <li className="px-4 py-6 text-center text-sm text-muted-foreground">
              No results for &ldquo;{q}&rdquo;
            </li>
          )}
          {results.map((item, i) => (
            <li key={`${item.kind}-${"slug" in item ? item.slug : item.to}`}>
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onClick={() => go(item)}
                className={`flex w-full flex-col gap-0.5 px-4 py-2.5 text-left text-sm transition-colors ${
                  i === active ? "bg-muted" : "hover:bg-muted/60"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="rounded bg-accent/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-accent">
                    {item.kind}
                  </span>
                  <span className="font-medium text-ink">{item.title}</span>
                </span>
                <span className="line-clamp-1 text-xs text-muted-foreground">{item.subtitle}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="border-t border-border bg-muted/40 px-4 py-2 text-[11px] text-muted-foreground">
          <kbd className="rounded border border-border bg-background px-1.5">↑↓</kbd> navigate ·{" "}
          <kbd className="rounded border border-border bg-background px-1.5">↵</kbd> select ·{" "}
          <kbd className="rounded border border-border bg-background px-1.5">esc</kbd> close
        </div>
      </div>
    </div>
  );
}
