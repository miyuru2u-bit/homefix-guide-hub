import { Link } from "@tanstack/react-router";
import { CATEGORIES } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-5">
        <div className="md:col-span-2">
          <p className="font-display text-lg font-semibold text-ink">
            Home Appliance Cost Guide
          </p>
          <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-soft">
            Plain-English repair pricing, warranty breakdowns, and repair-vs-replace
            decisions for US homeowners. Independent, brand-agnostic, no upsells.
          </p>
        </div>
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Categories
          </p>
          <ul className="space-y-2 text-sm">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link
                  to="/category/$category"
                  params={{ category: c.slug }}
                  className="text-ink-soft hover:text-primary"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Site
          </p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="text-ink-soft hover:text-primary">Home</Link></li>
            <li><Link to="/blog" className="text-ink-soft hover:text-primary">All Articles</Link></li>
            <li><Link to="/about" className="text-ink-soft hover:text-primary">About</Link></li>
            <li><Link to="/contact" className="text-ink-soft hover:text-primary">Contact</Link></li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Legal
          </p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="text-ink-soft hover:text-primary">About</Link></li>
            <li><Link to="/contact" className="text-ink-soft hover:text-primary">Contact</Link></li>
            <li><Link to="/privacy-policy" className="text-ink-soft hover:text-primary">Privacy Policy</Link></li>
            <li><Link to="/terms" className="text-ink-soft hover:text-primary">Terms of Service</Link></li>
            <li><Link to="/disclaimer" className="text-ink-soft hover:text-primary">Disclaimer</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-muted-foreground sm:px-6">
          © {new Date().getFullYear()} Home Appliance Cost Guide. Informational content only —
          not professional repair advice. Always consult a licensed technician for safety-critical work.
        </p>
      </div>
    </footer>
  );
}
