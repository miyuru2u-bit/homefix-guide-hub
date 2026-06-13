import { Link } from "@tanstack/react-router";
import { CATEGORIES } from "@/lib/content";
import { Wrench } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-md bg-primary text-primary-foreground">
            <Wrench className="h-4 w-4" aria-hidden />
          </span>
          <span className="font-display text-lg font-semibold leading-none text-ink">
            Home Appliance <span className="text-accent">Cost Guide</span>
          </span>
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          <NavLink to="/" label="Home" />
          <NavLink to="/blog" label="All Articles" />
          <div className="group relative">
            <button className="rounded-md px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-muted hover:text-ink">
              Categories
            </button>
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
          <NavLink to="/about" label="About" />
          <NavLink to="/contact" label="Contact" />
        </nav>
      </div>
    </header>
  );
}

function NavLink({ to, label }: { to: "/" | "/blog" | "/about" | "/contact"; label: string }) {
  return (
    <Link
      to={to}
      activeOptions={{ exact: to === "/" }}
      activeProps={{ className: "bg-muted text-ink" }}
      className="rounded-md px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-muted hover:text-ink"
    >
      {label}
    </Link>
  );
}
