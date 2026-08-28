import { Link } from "@tanstack/react-router";
import { Wrench } from "lucide-react";
import { CATEGORIES } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="relative mt-20 overflow-hidden bg-[#1F3A5F]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(#fff 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-6">
        <div className="md:col-span-2">
          <Link to="/" className="inline-flex items-center gap-2.5 sm:gap-3" aria-label="Home Appliance Cost Guide — home">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/20 bg-white/10">
              <Wrench className="h-5 w-5 text-white" aria-hidden strokeWidth={2.25} />
            </span>
            <span className="flex min-w-0 flex-col leading-none">
              <span className="font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
                Home Appliance
              </span>
              <span className="mt-0.5 font-display text-base font-bold tracking-tight text-white sm:text-lg">
                Cost<span className="text-white/60">Guide</span>
              </span>
            </span>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70">
            Plain-English repair pricing, warranty breakdowns, and repair-vs-replace
            decisions for US homeowners. Independent, brand-agnostic, no upsells.
          </p>
        </div>
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/50">
            Categories
          </p>
          <ul className="space-y-2 text-sm">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link
                  to="/category/$category"
                  params={{ category: c.slug }}
                  className="text-white/70 hover:text-white"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/50">
            Site
          </p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="text-white/70 hover:text-white">Home</Link></li>
            <li><Link to="/blog" className="text-white/70 hover:text-white">All Articles</Link></li>
            <li><Link to="/about" className="text-white/70 hover:text-white">About</Link></li>
            <li><Link to="/contact" className="text-white/70 hover:text-white">Contact</Link></li>
            <li><Link to="/tools" className="text-white/70 hover:text-white">Tools</Link></li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/50">
            Resources
          </p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/how-we-estimate-repair-costs" className="text-white/70 hover:text-white">How We Estimate Costs</Link></li>
            <li><Link to="/authors" className="text-white/70 hover:text-white">Authors &amp; Reviewers</Link></li>
            <li><Link to="/editorial-policy" className="text-white/70 hover:text-white">Editorial Policy</Link></li>
            <li><Link to="/error-codes" className="text-white/70 hover:text-white">Error Code Lookup</Link></li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/50">
            Legal
          </p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/privacy-policy" className="text-white/70 hover:text-white">Privacy Policy</Link></li>
            <li><Link to="/terms" className="text-white/70 hover:text-white">Terms of Service</Link></li>
            <li><Link to="/disclaimer" className="text-white/70 hover:text-white">Disclaimer</Link></li>
          </ul>
        </div>

      </div>
      <div className="relative border-t border-white/10">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-white/50 sm:px-6">
          &copy; {new Date().getFullYear()} Home Appliance Cost Guide. Informational content only &mdash;
          not professional repair advice. Always consult a licensed technician for safety-critical work.
        </p>
      </div>
    </footer>
  );
}
