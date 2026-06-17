import yaml from "js-yaml";
import { marked } from "marked";

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

export type Category = {
  slug: string;
  name: string;
  description: string;
};

export const CATEGORIES: Category[] = [
  {
    slug: "repair-vs-replace",
    name: "Repair vs Replace",
    description: "When to fix it, when to walk away. Decision frameworks for every major appliance.",
  },
  {
    slug: "repair-cost-guides",
    name: "Repair Cost Guides",
    description: "Real US pricing for parts and labor, updated for 2026.",
  },
  {
    slug: "appliance-error-codes",
    name: "Appliance Error Codes",
    description: "Decode the codes your appliance is flashing — and what each one usually costs to fix.",
  },
  {
    slug: "home-warranty-guides",
    name: "Home Warranty Guides",
    description: "What's covered, what's excluded, and when a warranty actually pays off.",
  },
  {
    slug: "buyer-guides",
    name: "Buyer Guides & Comparisons",
    description: "Honest, brand-agnostic comparisons for your next appliance purchase.",
  },
];

export type CostRow = { item: string; low: string; high: string };
export type FaqItem = { q: string; a: string };
export type TocItem = { id: string; text: string; level: number };

export type Post = {
  slug: string;
  title: string;
  metaDescription: string;
  category: string;
  tags: string[];
  date: string;
  author: string;
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

function parsePost(raw: string): Post {
  const { data, content } = parseFrontmatter(raw);
  const rawHtml = marked.parse(content) as string;
  const { html, toc } = injectHeadingIds(rawHtml);
  const excerptLine = content
    .split("\n")
    .map((l: string) => stripMarkdown(l))
    .find((l) => l.length > 60 && !l.startsWith("#"));
  const excerpt = excerptLine ? excerptLine.slice(0, 180).trim() : "";
  return {
    slug: data.slug,
    title: data.title,
    metaDescription: data.metaDescription,
    category: data.category,
    tags: data.tags ?? [],
    date: data.date,
    author: data.author ?? "Editorial Team",
    image: imageMap[data.image] ?? "",
    imageAlt: data.imageAlt ?? data.title,
    quickAnswer: data.quickAnswer ?? "",
    costTable: data.costTable ?? [],
    faq: data.faq ?? [],
    html,
    excerpt,
    toc,
  };
}

const allPosts: Post[] = Object.values(files)
  .map(parsePost)
  .sort((a, b) => (b.date > a.date ? 1 : b.date < a.date ? -1 : 0));

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

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
