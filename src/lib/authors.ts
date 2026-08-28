/**
 * Author + reviewer registry.
 *
 * IMPORTANT EDITORIAL RULE:
 * Never add invented people, credentials, certifications, technician
 * experience, or interviews here. Only add an entry once a real,
 * verifiable person (or the honest editorial entity) is supplied.
 *
 * An author profile only becomes indexable — and only emits Person
 * structured data — when it has:
 *   1. a real biography,
 *   2. relevant, verifiable experience, and
 *   3. at least one published article.
 * Entries that represent an organization (isPerson: false) never emit
 * Person schema.
 */

export type AuthorLink = {
  label: string;
  url: string;
};

export type Author = {
  /** Display name. */
  name: string;
  /** URL segment used at /authors/{slug}. */
  slug: string;
  /** Role on the site, e.g. "Editor", "Research lead". */
  role: string;
  /** Short biography. Empty string = not yet supplied. */
  bio: string;
  /** Relevant, verifiable experience. Null = not yet supplied. */
  experience: string | null;
  /** Profile image URL/import. Empty = none supplied. */
  image: string;
  /** Canonical profile URL on this site. */
  profileUrl: string;
  /** Social or professional links (LinkedIn, portfolio, etc.). */
  links: AuthorLink[];
  /** False for organizational bylines such as "Editorial Team". */
  isPerson: boolean;
};

export type Reviewer = {
  name: string;
  role: string;
  /** Relevant qualification. Null = not yet supplied. */
  qualification: string | null;
  /** ISO date the review was completed. */
  reviewDate: string;
  profileUrl: string | null;
  isPerson: boolean;
};

export const AUTHORS: Author[] = [
  {
    name: "Editorial Team",
    slug: "editorial-team",
    role: "Research and editorial staff",
    bio: "Articles credited to the Editorial Team are researched, written, and edited in-house using published manufacturer documentation, retailer pricing, provider contracts, and publicly available repair cost data. We do not claim hands-on technician experience for this byline.",
    // No verified individual experience has been supplied yet, so this
    // profile stays noindex and emits no Person structured data.
    experience: null,
    image: "",
    profileUrl: "/authors/editorial-team",
    links: [],
    isPerson: false,
  },
];

const bySlug = new Map(AUTHORS.map((a) => [a.slug, a]));
const byName = new Map(AUTHORS.map((a) => [a.name.toLowerCase(), a]));

export function authorNameToSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export function getAuthor(slugOrName: string | undefined): Author | undefined {
  if (!slugOrName) return undefined;
  return (
    bySlug.get(slugOrName) ??
    byName.get(slugOrName.toLowerCase()) ??
    bySlug.get(authorNameToSlug(slugOrName))
  );
}

export function getAllAuthors(): Author[] {
  return AUTHORS;
}

/** A profile is publishable/indexable only with real bio + experience + articles. */
export function isAuthorProfileComplete(author: Author, articleCount: number): boolean {
  return (
    author.bio.trim().length > 0 &&
    (author.experience?.trim().length ?? 0) > 0 &&
    articleCount > 0
  );
}

/** Person schema is only emitted for real people with real details. */
export function shouldEmitPersonSchema(author: Author, articleCount: number): boolean {
  return author.isPerson && isAuthorProfileComplete(author, articleCount);
}

/** Fallback byline used when frontmatter supplies no author. */
export const DEFAULT_AUTHOR_NAME = "Editorial Team";
