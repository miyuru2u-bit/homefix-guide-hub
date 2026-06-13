import { Lightbulb } from "lucide-react";

export function QuickAnswer({ text }: { text: string }) {
  return (
    <aside
      className="not-prose my-8 rounded-xl border border-callout/40 bg-callout/60 p-5 sm:p-6"
      aria-label="Quick answer"
    >
      <div className="flex items-start gap-3">
        <Lightbulb className="mt-0.5 h-5 w-5 flex-none text-accent" aria-hidden />
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-callout-foreground/70">
            Quick answer
          </p>
          <p className="text-[1.0625rem] leading-relaxed text-callout-foreground">{text}</p>
        </div>
      </div>
    </aside>
  );
}
