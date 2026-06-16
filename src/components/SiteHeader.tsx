import { Link } from "@tanstack/react-router";
import { CATEGORIES } from "@/lib/content";
import { Menu, X } from "lucide-react";
import { useState } from "react";


const navLinkClass =
  "rounded-md px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-muted hover:text-ink";
const activeClass = { className: "bg-muted text-ink" };

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
            <img src="/images/logo.png" alt="" className="h-12 w-auto" />
            <span className="font-display text-lg font-semibold leading-none text-ink">
              Home Appliance <span className="text-accent">Cost Guide</span>
            </span>
          </Link>
          <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
            <Link to="/" activeOptions={{ exact: true }} activeProps={activeClass} className={navLinkClass}>
              Home
            </Link>
            <Link to="/blog" className={navLinkClass}>
              All Articles
            </Link>
            <div className="group relative">
              <button className={navLinkClass}>Categories</button>
              <div className="invisible absolute right-0 top-full w-72 rounded-xl border border-border bg-card p-2 opacity-0 shadow-card transition-all group-hover:visible group-hover:opacity-100">
                {CATEGORIES.map((c) => (
                  <Link
                    key={c.slug}
                    to="/category/$category"
                    params={{ category: c.slug }}
                    className="block rounded-md px-3 py-2 text-sm text-ink-soft hover:bg-muted hover:text-ink"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link to="/about" activeProps={activeClass} className={navLinkClass}>
              About
            </Link>
            <Link to="/contact" activeProps={activeClass} className={navLinkClass}>
              Contact
            </Link>
          </nav>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background text-ink transition-colors hover:bg-muted md:hidden"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-primary-navigation"
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
        {mobileOpen && (
          <nav id="mobile-primary-navigation" aria-label="Primary" className="mt-4 border-t border-border pt-4 md:hidden">
            <div className="grid gap-1">
              <Link to="/" activeOptions={{ exact: true }} className={navLinkClass} onClick={() => setMobileOpen(false)}>
                Home
              </Link>
              <Link to="/blog" className={navLinkClass} onClick={() => setMobileOpen(false)}>
                All Articles
              </Link>
              <p className="px-3 pt-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Categories
              </p>
              {CATEGORIES.map((c) => (
                <Link
                  key={c.slug}
                  to="/category/$category"
                  params={{ category: c.slug }}
                  className="rounded-md px-3 py-2 text-sm text-ink-soft hover:bg-muted hover:text-ink"
                  onClick={() => setMobileOpen(false)}
                >
                  {c.name}
                </Link>
              ))}
              <Link to="/about" className={navLinkClass} onClick={() => setMobileOpen(false)}>
                About
              </Link>
              <Link to="/contact" className={navLinkClass} onClick={() => setMobileOpen(false)}>
                Contact
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
