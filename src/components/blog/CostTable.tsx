import type { CostRow } from "@/lib/content";

export function CostTable({ rows, caption }: { rows: CostRow[]; caption?: string }) {
  if (!rows?.length) return null;
  return (
    <div className="not-prose my-8 overflow-hidden rounded-xl border border-border bg-card shadow-soft">
      {caption && (
        <div className="border-b border-border bg-muted/50 px-5 py-3">
          <p className="text-sm font-semibold text-ink">{caption}</p>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30 text-left">
              <th className="px-5 py-3 font-semibold text-ink">Repair</th>
              <th className="px-5 py-3 font-semibold text-ink">Low</th>
              <th className="px-5 py-3 font-semibold text-ink">High</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-border/60 last:border-0">
                <td className="px-5 py-3 text-ink">{r.item}</td>
                <td className="px-5 py-3 font-mono text-ink-soft">{r.low}</td>
                <td className="px-5 py-3 font-mono text-ink-soft">{r.high}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="border-t border-border bg-muted/30 px-5 py-2 text-xs text-muted-foreground">
        US national averages including parts and labor. Local pricing varies.
      </p>
    </div>
  );
}
