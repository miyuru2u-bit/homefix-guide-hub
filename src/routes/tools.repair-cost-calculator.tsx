import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { APPLIANCES, REGIONS, estimateRepair } from "@/lib/calculator-data";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";

export const Route = createFileRoute("/tools/repair-cost-calculator")({
  head: () => ({
    meta: [
      { title: "Appliance Repair Cost Calculator — Free 2026 Tool" },
      {
        name: "description",
        content:
          "Free repair cost calculator for refrigerators, washers, dryers, dishwashers, and ovens. Estimate parts + labor by appliance, symptom, brand, and US region.",
      },
      { property: "og:title", content: "Appliance Repair Cost Calculator" },
      {
        property: "og:description",
        content: "Estimate appliance repair costs in seconds — by symptom, brand, and region.",
      },
      { property: "og:url", content: "https://whatrepaircosts.com/tools/repair-cost-calculator" },
    ],
    links: [{ rel: "canonical", href: "https://whatrepaircosts.com/tools/repair-cost-calculator" }],
  }),
  component: CalculatorPage,
});

function CalculatorPage() {
  const [applianceId, setApplianceId] = useState(APPLIANCES[0].id);
  const [brand, setBrand] = useState(APPLIANCES[0].brands[0]);
  const [symptomId, setSymptomId] = useState(APPLIANCES[0].symptoms[0].id);
  const [regionId, setRegionId] = useState(REGIONS[0].id);

  const appliance = APPLIANCES.find((a) => a.id === applianceId)!;
  const symptom = appliance.symptoms.find((s) => s.id === symptomId) ?? appliance.symptoms[0];
  const region = REGIONS.find((r) => r.id === regionId)!;
  const estimate = useMemo(() => estimateRepair(symptom, region.multiplier), [symptom, region]);

  const onApplianceChange = (id: string) => {
    const next = APPLIANCES.find((a) => a.id === id)!;
    setApplianceId(id);
    setBrand(next.brands[0]);
    setSymptomId(next.symptoms[0].id);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Tools", to: "/tools" }, { label: "Repair cost calculator" }]} />

      <header className="mt-6 mb-8 border-b border-border pb-8">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent">Free tool</p>
        <h1 className="font-display text-4xl font-semibold text-ink sm:text-5xl">
          Appliance repair cost calculator
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-ink-soft">
          Pick what's broken and where you live. We'll show a realistic 2026 US price range
          for parts and labor.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <form className="space-y-5 rounded-xl border border-border bg-card p-6">
          <Field label="Appliance">
            <select
              value={applianceId}
              onChange={(e) => onApplianceChange(e.target.value)}
              className="select"
            >
              {APPLIANCES.map((a) => (
                <option key={a.id} value={a.id}>{a.label}</option>
              ))}
            </select>
          </Field>

          <Field label="Brand (optional)">
            <select value={brand} onChange={(e) => setBrand(e.target.value)} className="select">
              {appliance.brands.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </Field>

          <Field label="What's wrong?">
            <select value={symptomId} onChange={(e) => setSymptomId(e.target.value)} className="select">
              {appliance.symptoms.map((s) => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </Field>

          <Field label="Your region">
            <select value={regionId} onChange={(e) => setRegionId(e.target.value)} className="select">
              {REGIONS.map((r) => (
                <option key={r.id} value={r.id}>{r.label}</option>
              ))}
            </select>
          </Field>
        </form>

        <aside className="rounded-xl border border-border bg-surface p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Estimated cost
          </p>
          <p className="mt-2 font-display text-4xl font-bold text-ink">
            ${estimate.low}–${estimate.high}
          </p>
          <p className="mt-1 text-sm text-ink-soft">
            Typical: <strong className="text-ink">${estimate.avg}</strong>
          </p>

          <div className="mt-5 rounded-md bg-background p-3 text-xs text-muted-foreground">
            National average for this symptom: ${estimate.national.low}–${estimate.national.high}.
            {region.multiplier !== 1 && (
              <> Your region tends to run {region.multiplier > 1 ? "higher" : "lower"} than average.</>
            )}
          </div>

          <Link
            to="/blog/$slug"
            params={{ slug: appliance.guideSlug }}
            className="mt-5 inline-block text-sm font-medium text-primary hover:underline"
          >
            Read the full {appliance.label} cost guide →
          </Link>
        </aside>
      </div>

      <p className="mt-8 text-xs text-muted-foreground">
        Estimates are for typical residential repairs in the US, including parts and labor.
        Actual quotes vary by brand, model age, and local technician rates. Always get a
        written diagnosis before authorizing work.
      </p>

      <style>{`
        .select {
          width: 100%;
          border-radius: 0.5rem;
          border: 1px solid hsl(var(--border));
          background: hsl(var(--background));
          padding: 0.625rem 0.75rem;
          font-size: 0.95rem;
          color: hsl(var(--foreground));
        }
        .select:focus { outline: 2px solid hsl(var(--accent)); outline-offset: 1px; }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      {children}
    </label>
  );
}
