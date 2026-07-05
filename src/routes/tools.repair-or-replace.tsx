import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Breadcrumbs } from "@/components/blog/Breadcrumbs";

export const Route = createFileRoute("/tools/repair-or-replace")({
  head: () => ({
    meta: [
      { title: "Repair vs Replace Calculator — Should You Fix It?" },
      {
        name: "description",
        content:
          "Free repair vs replace decision tool. Apply the 50% rule with appliance age and lifespan to get a clear Repair, Replace, or Borderline verdict.",
      },
      { property: "og:title", content: "Repair vs Replace Calculator" },
      {
        property: "og:description",
        content: "Should you repair or replace? Get a clear verdict based on age, repair cost, and replacement price.",
      },
      { property: "og:url", content: "https://whatrepaircosts.com/tools/repair-or-replace" },
      { property: "og:image", content: "https://whatrepaircosts.com/images/logo-stacked.png" },
      { name: "twitter:image", content: "https://whatrepaircosts.com/images/logo-stacked.png" },
    ],
    links: [{ rel: "canonical", href: "https://whatrepaircosts.com/tools/repair-or-replace" }],
  }),
  component: RepairOrReplacePage,
});

const APPLIANCES = [
  { id: "refrigerator", label: "Refrigerator", lifespan: 13 },
  { id: "washer", label: "Washing machine", lifespan: 11 },
  { id: "dryer", label: "Dryer", lifespan: 13 },
  { id: "dishwasher", label: "Dishwasher", lifespan: 9 },
  { id: "oven", label: "Oven / range", lifespan: 15 },
];

type Verdict = {
  label: "Repair" | "Replace" | "Borderline";
  tone: "ok" | "warn" | "bad";
  reasons: string[];
};

function decide(repair: number, replace: number, age: number, lifespan: number): Verdict {
  if (repair <= 0 || replace <= 0) {
    return { label: "Borderline", tone: "warn", reasons: ["Enter both costs to see a verdict."] };
  }
  const ratio = repair / replace;
  const lifeLeft = Math.max(0, lifespan - age);
  const lifeFraction = lifeLeft / lifespan;
  const reasons: string[] = [];
  reasons.push(`Repair is ${Math.round(ratio * 100)}% of replacement cost.`);
  reasons.push(`Appliance has roughly ${lifeLeft} year${lifeLeft === 1 ? "" : "s"} of expected life left.`);

  if (ratio >= 0.5 || lifeFraction < 0.25) {
    return {
      label: "Replace",
      tone: "bad",
      reasons: [
        ...reasons,
        ratio >= 0.5
          ? "When repair tops 50% of a new unit, replacement is usually the smarter long-term spend."
          : "With little expected life left, a second repair is likely soon.",
      ],
    };
  }
  if (ratio >= 0.35 || lifeFraction < 0.4) {
    return {
      label: "Borderline",
      tone: "warn",
      reasons: [
        ...reasons,
        "Repair makes sense if the technician finds no other looming issues — ask for a full inspection.",
      ],
    };
  }
  return {
    label: "Repair",
    tone: "ok",
    reasons: [
      ...reasons,
      "Repair is well under the 50% rule and the unit still has plenty of useful life.",
    ],
  };
}

const toneStyles: Record<Verdict["tone"], string> = {
  ok: "border-success/40 bg-success/10 text-success-foreground",
  warn: "border-warning/50 bg-warning/40 text-warning-foreground",
  bad: "border-destructive/40 bg-destructive/10 text-destructive",
};

function RepairOrReplacePage() {
  const [applianceId, setApplianceId] = useState(APPLIANCES[0].id);
  const [age, setAge] = useState(8);
  const [repair, setRepair] = useState(350);
  const [replace, setReplace] = useState(1100);

  const appliance = APPLIANCES.find((a) => a.id === applianceId)!;
  const verdict = useMemo(
    () => decide(repair, replace, age, appliance.lifespan),
    [repair, replace, age, appliance.lifespan],
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Tools", to: "/tools" }, { label: "Repair or replace?" }]} />

      <header className="mt-6 mb-8 border-b border-border pb-8">
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-accent">Free tool</p>
        <h1 className="font-display text-4xl font-semibold text-ink sm:text-5xl">
          Should you repair or replace it?
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-ink-soft">
          The classic 50% rule, plus expected lifespan. Get a clear answer in seconds.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <form className="space-y-5 rounded-xl border border-border bg-card p-6">
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink">Appliance</span>
            <select
              value={applianceId}
              onChange={(e) => setApplianceId(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-[0.95rem]"
            >
              {APPLIANCES.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.label} (typ. lifespan {a.lifespan} yrs)
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink">
              Age of appliance: <strong>{age} year{age === 1 ? "" : "s"}</strong>
            </span>
            <input
              type="range"
              min={0}
              max={25}
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="w-full accent-[hsl(var(--accent))]"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink">Repair quote (USD)</span>
            <input
              type="number"
              min={0}
              value={repair}
              onChange={(e) => setRepair(Number(e.target.value))}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-[0.95rem]"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink">
              Comparable replacement cost (USD)
            </span>
            <input
              type="number"
              min={0}
              value={replace}
              onChange={(e) => setReplace(Number(e.target.value))}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-[0.95rem]"
            />
          </label>
        </form>

        <aside className={`rounded-xl border p-6 ${toneStyles[verdict.tone]}`}>
          <p className="text-xs font-semibold uppercase tracking-wider opacity-80">Verdict</p>
          <p className="mt-1 font-display text-4xl font-bold">{verdict.label}</p>
          <ul className="mt-4 space-y-2 text-sm leading-relaxed">
            {verdict.reasons.map((r, i) => (
              <li key={i}>• {r}</li>
            ))}
          </ul>
          <Link
            to="/category/$category"
            params={{ category: "repair-vs-replace" }}
            className="mt-5 inline-block text-sm font-medium underline"
          >
            Read the {appliance.label.toLowerCase()} repair-vs-replace guide →
          </Link>
        </aside>
      </div>
    </div>
  );
}
