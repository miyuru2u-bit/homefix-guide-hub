import yaml from "js-yaml";
import { marked } from "marked";
import { getAuthor, authorNameToSlug, DEFAULT_AUTHOR_NAME } from "@/lib/authors";

import fridgeImg from "@/assets/post-fridge.webp";
import washerImg from "@/assets/post-washer.webp";
import dishwasherImg from "@/assets/post-dishwasher.webp";
import homeWarrantyImg from "@/assets/post-home-warranty.webp";
import warrantyVsInsuranceImg from "@/assets/post-warranty-vs-insurance.webp";
import repairOrReplaceImg from "@/assets/post-repair-or-replace.webp";
import avgRepairCostImg from "@/assets/post-average-repair-cost.webp";
import whatCoversImg from "@/assets/post-what-home-warranty-covers.webp";
import fridgeGuideImg from "@/assets/post-refrigerator-repair-cost-guide.jpg";
import washerGuideImg from "@/assets/post-washing-machine-repair-cost-guide.jpg";
import dishwasherGuideImg from "@/assets/post-dishwasher-repair-cost-guide.jpg";
import dryerGuideImg from "@/assets/post-dryer-repair-cost-guide.jpg";
import ovenStoveGuideImg from "@/assets/post-oven-stove-repair-cost-guide.jpg";
import hwFridgeImg from "@/assets/post-does-home-warranty-cover-refrigerator.jpg";
import hwWasherDryerImg from "@/assets/post-does-home-warranty-cover-washer-dryer.jpg";
import hwDishwasherImg from "@/assets/post-does-home-warranty-cover-dishwasher.jpg";
import hwClaimsDeniedImg from "@/assets/post-why-home-warranty-claims-get-denied.jpg";
import hwWaitingPeriodImg from "@/assets/post-home-warranty-waiting-period-explained.jpg";
import samsung4cImg from "@/assets/post-samsung-washer-4c-error.jpg";
import lgOeImg from "@/assets/post-lg-washer-oe-error.jpg";
import whirlpoolF2e2Img from "@/assets/post-whirlpool-dishwasher-f2e2-error.jpg";
import boschE15Img from "@/assets/post-bosch-dishwasher-e15-error.jpg";
import geF3Img from "@/assets/post-ge-oven-f3-error.jpg";
import rorFridgeImg from "@/assets/post-repair-or-replace-refrigerator.jpg";
import rorWasherImg from "@/assets/post-repair-or-replace-washing-machine.jpg";
import rorDishwasherImg from "@/assets/post-repair-or-replace-dishwasher.jpg";
import rorDryerImg from "@/assets/post-repair-or-replace-dryer.jpg";
import rorOvenImg from "@/assets/post-repair-or-replace-oven.jpg";
import bestHwImg from "@/assets/post-best-home-warranty-for-appliances.jpg";
import extVsHwImg from "@/assets/post-extended-warranty-vs-home-warranty.jpg";
import mostExpensiveImg from "@/assets/post-most-expensive-appliances-to-repair.jpg";
import reliableBrandsImg from "@/assets/post-most-reliable-appliance-brands.jpg";
import cheapestMaintainImg from "@/assets/post-cheapest-appliances-to-maintain.jpg";
import choiceVsAhsImg from "@/assets/post-choice-vs-ahs.jpg";
import firstAmericanVsAhsImg from "@/assets/post-first-american-vs-ahs.jpg";
import selectVsChoiceImg from "@/assets/post-select-vs-choice.jpg";
import libertyVsAhsImg from "@/assets/post-liberty-vs-ahs.jpg";
import cinchVsAhsImg from "@/assets/post-cinch-vs-ahs.jpg";
import bestHwOlderHomesImg from "@/assets/post-best-hw-older-homes.jpg";
import bestHwHvacImg from "@/assets/post-best-hw-hvac.jpg";
import bestHwNoWaitingImg from "@/assets/post-best-hw-no-waiting.jpg";
import bestHwRentalImg from "@/assets/post-best-hw-rental.jpg";
import cheapestHwImg from "@/assets/post-cheapest-hw.jpg";
import sellersHwImg from "@/assets/post-sellers-home-warranty.jpg";
import whoPaysHwImg from "@/assets/post-who-pays-home-warranty.jpg";
import hwAtClosingImg from "@/assets/post-home-warranty-at-closing.jpg";
import hwFirstTimeImg from "@/assets/post-home-warranty-first-time-buyers.jpg";
import hwTransferImg from "@/assets/post-does-home-warranty-transfer.jpg";
import ahsReviewImg from "@/assets/post-american-home-shield-review.jpg";
import choiceReviewImg from "@/assets/post-choice-home-warranty-review.jpg";
import lhgReviewImg from "@/assets/post-liberty-home-guard-review.jpg";
import selectReviewImg from "@/assets/post-select-home-warranty-review.jpg";
import cinchReviewImg from "@/assets/post-cinch-home-services-review.jpg";
import extAppWarrantiesWorthItImg from "@/assets/post-are-extended-appliance-warranties-worth-it.jpg";
import hwVsApplianceWarrantyImg from "@/assets/post-home-warranty-vs-appliance-warranty.jpg";
import bestAppExtWarrantyImg from "@/assets/post-best-appliances-extended-warranty.jpg";
import whatApplianceWarrantyCoversImg from "@/assets/post-what-appliance-warranty-covers.jpg";
import applianceWarrantyClaimImg from "@/assets/post-appliance-warranty-claim-process.jpg";
import hwOldAppliancesImg from "@/assets/post-do-home-warranties-cover-old-appliances.jpg";
import applianceWarrantyVsRepairImg from "@/assets/post-appliance-warranty-vs-repair-cost.jpg";
import hwWorthItAppliancesImg from "@/assets/post-are-home-warranties-worth-it-for-appliances.jpg";
import applianceRepairVsReplacementImg from "@/assets/post-appliance-repair-vs-replacement.jpg";
import ahsCompleteVsPlatinumImg from "@/assets/post-ahs-complete-vs-platinum.jpg";
import ahsShieldWaitingPeriodImg from "@/assets/post-ahs-shield-waiting-period.jpg";
import applianceLifespanGuideImg from "@/assets/post-appliance-lifespan-guide.jpg";
import avgApplianceRepairCostByTypeImg from "@/assets/post-average-appliance-repair-cost-by-type.jpg";
import whyApplianceRepairsCostSoMuchImg from "@/assets/post-why-appliance-repairs-cost-so-much.jpg";
import cheapestAppliancesToRepairImg from "@/assets/post-cheapest-appliances-to-repair.jpg";
import applianceMaintenanceChecklistImg from "@/assets/post-appliance-maintenance-checklist.jpg";
import applianceProblemsNotWorthRepairingImg from "@/assets/post-appliance-problems-not-worth-repairing.jpg";

export type Category = {
  slug: string;
  name: string;
  description: string;
};

export const CATEGORIES: Category[] = [
  {
    slug: "repair-cost-guides",
    name: "Repair Cost Guides",
    description:
      "Compare real-world appliance repair cost ranges, common parts, labor factors, and repair-vs-replace decisions for major home appliances.",
  },
  {
    slug: "home-warranty-guides",
    name: "Home Warranty Guides",
    description:
      "Plain-English guides to home warranties, appliance warranties, coverage limits, claims, exclusions, and when protection plans may or may not be worth it.",
  },
  {
    slug: "repair-vs-replace",
    name: "Repair vs Replace",
    description:
      "Decision guides for homeowners comparing appliance repair costs, replacement timing, appliance lifespan, warranty coverage, and long-term value.",
  },
  {
    slug: "appliance-error-codes",
    name: "Appliance Error Codes",
    description:
      "Troubleshooting guides for common appliance error codes, what they usually mean, and when to call a qualified repair technician.",
  },
  {
    slug: "buyer-guides",
    name: "Buyer Guides & Comparisons",
    description:
      "Brand, warranty, provider, and appliance comparison guides to help homeowners make informed repair, replacement, and protection-plan decisions.",
  },
];

export type CostRow = { item: string; low: string; high: string };
export type FaqItem = { q: string; a: string };
export type TocItem = { id: string; text: string; level: number };

export type PostSource = { title: string; url?: string; publisher?: string };
export type PostReviewer = {
  name: string;
  role: string;
  qualification: string | null;
  reviewDate: string;
  profileUrl: string | null;
  isPerson: boolean;
};

export type Post = {
  slug: string;
  title: string;
  metaDescription: string;
  category: string;
  tags: string[];
  /** Published date (ISO). */
  date: string;
  /** Last materially updated date (ISO), when supplied. */
  updated: string | null;
  /** Short explanation of what changed in the last material update. */
  revisionSummary: string;
  author: string;
  authorSlug: string;
  reviewer: PostReviewer | null;
  /** "reviewed" | "editor-checked" | "unverified" */
  factCheckStatus: string;
  sources: PostSource[];
  image: string;
  imageAlt: string;
  quickAnswer: string;
  costTable: CostRow[];
  faq: FaqItem[];
  html: string;
  excerpt: string;
  toc: TocItem[];
};


function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&([a-zA-Z]+);/g, (_, name) => {
      const map: Record<string, string> = {
        amp: "&",
        lt: "<",
        gt: ">",
        quot: '"',
        apos: "'",
      };
      return map[name] || `&${name};`;
    });
}

function slugify(text: string): string {
  return decodeHtmlEntities(text)
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);
}

function injectHeadingIds(html: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const used = new Set<string>();
  const out = html.replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (_m, lvl: string, inner: string) => {
    const rawText = inner.replace(/<[^>]+>/g, "").trim();
    const text = decodeHtmlEntities(rawText);
    let id = slugify(text) || `section-${toc.length + 1}`;
    let i = 1;
    const base = id;
    while (used.has(id)) {
      i += 1;
      id = `${base}-${i}`;
    }
    used.add(id);
    toc.push({ id, text, level: Number(lvl) });
    return `<h${lvl} id="${id}">${inner}</h${lvl}>`;
  });
  return { html: out, toc };
}

const imageMap: Record<string, string> = {
  fridge: fridgeImg,
  washer: washerImg,
  dishwasher: dishwasherImg,
  "home-warranty": homeWarrantyImg,
  "warranty-vs-insurance": warrantyVsInsuranceImg,
  "repair-or-replace": repairOrReplaceImg,
  "average-repair-cost": avgRepairCostImg,
  "what-home-warranty-covers": whatCoversImg,
  "refrigerator-repair-cost-guide": fridgeGuideImg,
  "washing-machine-repair-cost-guide": washerGuideImg,
  "dishwasher-repair-cost-guide": dishwasherGuideImg,
  "dryer-repair-cost-guide": dryerGuideImg,
  "oven-stove-repair-cost-guide": ovenStoveGuideImg,
  "does-home-warranty-cover-refrigerator": hwFridgeImg,
  "does-home-warranty-cover-washer-dryer": hwWasherDryerImg,
  "does-home-warranty-cover-dishwasher": hwDishwasherImg,
  "why-home-warranty-claims-get-denied": hwClaimsDeniedImg,
  "home-warranty-waiting-period-explained": hwWaitingPeriodImg,
  "samsung-washer-4c-error": samsung4cImg,
  "lg-washer-oe-error": lgOeImg,
  "whirlpool-dishwasher-f2e2-error": whirlpoolF2e2Img,
  "bosch-dishwasher-e15-error": boschE15Img,
  "ge-oven-f3-error": geF3Img,
  "repair-or-replace-refrigerator": rorFridgeImg,
  "repair-or-replace-washing-machine": rorWasherImg,
  "repair-or-replace-dishwasher": rorDishwasherImg,
  "repair-or-replace-dryer": rorDryerImg,
  "repair-or-replace-oven": rorOvenImg,
  "best-home-warranty-for-appliances": bestHwImg,
  "extended-warranty-vs-home-warranty": extVsHwImg,
  "most-expensive-appliances-to-repair": mostExpensiveImg,
  "most-reliable-appliance-brands": reliableBrandsImg,
  "cheapest-appliances-to-maintain": cheapestMaintainImg,
  "choice-vs-ahs": choiceVsAhsImg,
  "first-american-vs-ahs": firstAmericanVsAhsImg,
  "select-vs-choice": selectVsChoiceImg,
  "liberty-vs-ahs": libertyVsAhsImg,
  "cinch-vs-ahs": cinchVsAhsImg,
  "best-hw-older-homes": bestHwOlderHomesImg,
  "best-hw-hvac": bestHwHvacImg,
  "best-hw-no-waiting": bestHwNoWaitingImg,
  "best-hw-rental": bestHwRentalImg,
  "cheapest-hw": cheapestHwImg,
  "sellers-home-warranty": sellersHwImg,
  "who-pays-home-warranty": whoPaysHwImg,
  "home-warranty-at-closing": hwAtClosingImg,
  "home-warranty-first-time-buyers": hwFirstTimeImg,
  "does-home-warranty-transfer": hwTransferImg,
  "american-home-shield-review": ahsReviewImg,
  "choice-home-warranty-review": choiceReviewImg,
  "liberty-home-guard-review": lhgReviewImg,
  "select-home-warranty-review": selectReviewImg,
  "cinch-home-services-review": cinchReviewImg,
  "are-extended-appliance-warranties-worth-it": extAppWarrantiesWorthItImg,
  "home-warranty-vs-appliance-warranty": hwVsApplianceWarrantyImg,
  "best-appliances-extended-warranty": bestAppExtWarrantyImg,
  "best-appliances-to-cover-with-extended-warranty": bestAppExtWarrantyImg,
  "what-appliance-warranty-covers": whatApplianceWarrantyCoversImg,
  "appliance-warranty-claim-process": applianceWarrantyClaimImg,
  "do-home-warranties-cover-old-appliances": hwOldAppliancesImg,
  "appliance-warranty-vs-repair-cost": applianceWarrantyVsRepairImg,
  "are-home-warranties-worth-it-for-appliances": hwWorthItAppliancesImg,
  "appliance-repair-vs-replacement": applianceRepairVsReplacementImg,
  "ahs-complete-vs-platinum": ahsCompleteVsPlatinumImg,
  "ahs-shield-waiting-period": ahsShieldWaitingPeriodImg,
  "appliance-lifespan-guide": applianceLifespanGuideImg,
  "average-appliance-repair-cost-by-type": avgApplianceRepairCostByTypeImg,
  "why-appliance-repairs-cost-so-much": whyApplianceRepairsCostSoMuchImg,
  "cheapest-appliances-to-repair": cheapestAppliancesToRepairImg,
  "appliance-maintenance-checklist": applianceMaintenanceChecklistImg,
  "appliance-problems-not-worth-repairing": applianceProblemsNotWorthRepairingImg,
};

// Vite imports raw markdown at build time. Migration to a CMS later is just
// swapping this glob for a fetch.
const files = import.meta.glob("../content/posts/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

marked.setOptions({ gfm: true, breaks: false });

function parseFrontmatter(raw: string): { data: Record<string, any>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };
  const data = (yaml.load(match[1]) as Record<string, any>) ?? {};
  return { data, content: match[2] };
}

function stripMarkdown(text: string): string {
  return text
    .replace(/`{1,3}[^`]*`{1,3}/g, "")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_~]{1,3}([^*_~]+)[*_~]{1,3}/g, "$1")
    .replace(/^\s*>\s?/gm, "")
    .replace(/<[^>]+>/g, "")
    .trim();
}

const POST_IMPORT_MODE: "clamp" | "throw" = "clamp";

function validatePostDate(slug: string, date: string): string {
  if (!/^\d{4}-\d{2}-\d{2}/.test(date)) {
    throw new Error(`[content] Post "${slug}" has invalid date "${date}" (expected YYYY-MM-DD).`);
  }
  const today = new Date().toISOString().slice(0, 10);
  const postDay = date.slice(0, 10);
  if (postDay > today) {
    if (POST_IMPORT_MODE === "throw") {
      throw new Error(`[content] Post "${slug}" has future date ${postDay} (today is ${today}).`);
    }
    console.warn(`[content] Post "${slug}" had future date ${postDay}; clamped to ${today}.`);
    return today;
  }
  return date;
}

function parsePost(raw: string): Post {
  const { data, content } = parseFrontmatter(raw);
  data.date = validatePostDate(data.slug, data.date);
  const rawHtml = marked.parse(content) as string;
  const { html, toc } = injectHeadingIds(rawHtml);
  const excerptLine = content
    .split("\n")
    .map((l: string) => stripMarkdown(l))
    .find((l) => l.length > 60 && !l.startsWith("#"));
  const excerpt = excerptLine ? excerptLine.slice(0, 180).trim() : "";
  const metaFallback = (excerpt || data.quickAnswer || "").slice(0, 158).trim();
  const authorName = (data.author && String(data.author).trim()) || DEFAULT_AUTHOR_NAME;
  const authorRecord = getAuthor(data.authorSlug ?? authorName);
  const rawUpdated = data.updated ?? data.lastUpdated ?? null;
  const updated =
    typeof rawUpdated === "string" && isValidDate(rawUpdated) && rawUpdated.slice(0, 10) >= data.date.slice(0, 10)
      ? rawUpdated.slice(0, 10)
      : null;
  const r = data.reviewer;
  const reviewer: PostReviewer | null =
    r && typeof r === "object" && r.name && String(r.name).trim()
      ? {
          name: String(r.name).trim(),
          role: (r.role && String(r.role).trim()) || "Reviewer",
          qualification: r.qualification ? String(r.qualification).trim() : null,
          reviewDate: isValidDate(r.reviewDate) ? String(r.reviewDate).slice(0, 10) : "",
          profileUrl: r.profileUrl ? String(r.profileUrl).trim() : null,
          isPerson: r.isPerson !== false,
        }
      : null;
  const sources: PostSource[] = Array.isArray(data.sources)
    ? data.sources
        .map((s: any) =>
          typeof s === "string"
            ? { title: s }
            : s && s.title
              ? { title: String(s.title), url: s.url ? String(s.url) : undefined, publisher: s.publisher ? String(s.publisher) : undefined }
              : null,
        )
        .filter((s: PostSource | null): s is PostSource => s !== null)
    : [];
  return {
    slug: data.slug,
    title: data.title,
    metaDescription: (data.metaDescription && String(data.metaDescription).trim()) || metaFallback,
    category: data.category,
    tags: data.tags ?? [],
    date: data.date,
    updated,
    revisionSummary: (data.revisionSummary && String(data.revisionSummary).trim()) || "",
    author: authorRecord?.name ?? authorName,
    authorSlug: authorRecord?.slug ?? authorNameToSlug(authorName),
    reviewer,
    factCheckStatus:
      (data.factCheckStatus && String(data.factCheckStatus).trim()) ||
      (reviewer ? "reviewed" : "editor-checked"),
    sources,
    image: imageMap[data.image] ?? "",

    imageAlt: (data.imageAlt && String(data.imageAlt).trim()) || data.title,
    quickAnswer: data.quickAnswer ?? "",
    costTable: data.costTable ?? [],
    faq: Array.isArray(data.faq)
      ? data.faq.filter((f: FaqItem) => f && f.q && f.a && String(f.q).trim() && String(f.a).trim())
      : [],
    html,
    excerpt,
    toc,
  };
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizeTitle(s: string): string {
  return s
    .toLowerCase()
    .replace(/&amp;/g, "&")
    .replace(/[\u2018\u2019\u2032]/g, "'")
    .replace(/[\u201C\u201D\u2033]/g, '"')
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

function linkifyRelatedPosts(posts: Post[]): void {
  // Build lookup of title (and a shortened "before colon" variant) -> slug
  const titleToSlug = new Map<string, string>();
  for (const p of posts) {
    titleToSlug.set(normalizeTitle(p.title), p.slug);
    const short = p.title.split(":")[0];
    if (short && short !== p.title) {
      const key = normalizeTitle(short);
      if (!titleToSlug.has(key)) titleToSlug.set(key, p.slug);
    }
  }

  for (const post of posts) {
    let html = post.html;

    // 1) Linkify <li> items inside the "Related articles" section.
    html = html.replace(
      /(<h2[^>]*>\s*Related articles\s*<\/h2>)([\s\S]*?)(?=<h2|$)/i,
      (_m, heading: string, body: string) => {
        const newBody = body.replace(
          /<li>([\s\S]*?)<\/li>/g,
          (liMatch: string, inner: string) => {
            // Skip if already a link
            if (/<a\s/i.test(inner)) return liMatch;
            const plain = inner.replace(/<[^>]+>/g, "").trim();
            const key = normalizeTitle(plain);
            const slug =
              titleToSlug.get(key) ??
              titleToSlug.get(normalizeTitle(plain.split(":")[0]));
            if (!slug || slug === post.slug) return liMatch;
            return `<li><a href="/blog/${slug}">${inner.trim()}</a></li>`;
          },
        );
        return heading + newBody;
      },
    );

    // 2) Linkify the first plain-text mention of any other post title in body paragraphs.
    for (const other of posts) {
      if (other.slug === post.slug) continue;
      const candidates = [other.title, other.title.split(":")[0]].filter(
        (t, i, arr) => t && (i === 0 || t !== arr[0]),
      );
      for (const candidate of candidates) {
        if (candidate.length < 12) continue;
        const pattern = new RegExp(
          `(?<![\\w>])(${escapeRegExp(candidate)})(?![\\w<])`,
          "i",
        );
        let replaced = false;
        html = html.replace(
          /<p>([\s\S]*?)<\/p>/g,
          (pMatch: string, inner: string) => {
            if (replaced) return pMatch;
            if (/<a\s/i.test(inner)) return pMatch;
            if (!pattern.test(inner)) return pMatch;
            const newInner = inner.replace(
              pattern,
              `<a href="/blog/${other.slug}">$1</a>`,
            );
            if (newInner === inner) return pMatch;
            replaced = true;
            
            return `<p>${newInner}</p>`;
          },
        );
        if (replaced) break;
      }
    }

    post.html = html;
  }
}

const allPosts: Post[] = Object.values(files)
  .map(parsePost)
  .sort((a, b) => (b.date > a.date ? 1 : b.date < a.date ? -1 : 0));

linkifyRelatedPosts(allPosts);

export function getAllPosts(): Post[] {
  return allPosts;
}

export function getPost(slug: string): Post | undefined {
  return allPosts.find((p) => p.slug === slug);
}

export function getPostsByCategory(catSlug: string): Post[] {
  return allPosts.filter((p) => p.category === catSlug);
}

export function getCategory(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function getRelatedPosts(post: Post, limit = 3): Post[] {
  const tagSet = new Set(post.tags.map((t) => t.toLowerCase()));
  return allPosts
    .filter((p) => p.slug !== post.slug)
    .map((p) => {
      const sameCat = p.category === post.category ? 3 : 0;
      const tagOverlap = p.tags.reduce(
        (n, t) => n + (tagSet.has(t.toLowerCase()) ? 1 : 0),
        0,
      );
      return { post: p, score: sameCat + tagOverlap };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((x) => x.post);
}

export type TagSummary = { slug: string; name: string; count: number };

function tagSlug(t: string): string {
  return t
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

const tagIndex = (() => {
  const map = new Map<string, { name: string; count: number }>();
  for (const p of allPosts) {
    for (const t of p.tags) {
      const slug = tagSlug(t);
      if (!slug) continue;
      const entry = map.get(slug) ?? { name: t, count: 0 };
      entry.count += 1;
      map.set(slug, entry);
    }
  }
  return map;
})();

export function getAllTags(): TagSummary[] {
  return [...tagIndex.entries()]
    .map(([slug, v]) => ({ slug, name: v.name, count: v.count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export function getTag(slug: string): TagSummary | undefined {
  const v = tagIndex.get(slug);
  return v ? { slug, name: v.name, count: v.count } : undefined;
}

export function getPostsByTag(slug: string): Post[] {
  return allPosts.filter((p) => p.tags.some((t) => tagSlug(t) === slug));
}

export function tagToSlug(tag: string): string {
  return tagSlug(tag);
}

export function isValidDate(iso: unknown): iso is string {
  if (typeof iso !== "string") return false;
  if (!/^\d{4}-\d{2}-\d{2}/.test(iso)) return false;
  const t = Date.parse(iso);
  if (!Number.isFinite(t)) return false;
  // Reject Unix epoch fallback (1970-01-01) as a real article date.
  if (iso.slice(0, 10) === "1970-01-01") return false;
  return true;
}

export function formatDate(iso: string): string {
  if (!isValidDate(iso)) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
