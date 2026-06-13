import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/lib/content";

export function FAQ({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  if (!items?.length) return null;
  return (
    <section className="not-prose my-10">
      <h2 className="mb-5 font-display text-2xl font-semibold text-ink">
        Frequently asked questions
      </h2>
      <div className="divide-y divide-border rounded-xl border border-border bg-card">
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={i}>
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-muted/40"
                aria-expanded={isOpen}
              >
                <span className="font-semibold text-ink">{item.q}</span>
                <ChevronDown
                  className={`h-4 w-4 flex-none text-muted-foreground transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-[0.975rem] leading-relaxed text-ink-soft">
                  {item.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
