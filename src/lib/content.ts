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

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z]+;/g, "")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);
}

function injectHeadingIds(html: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const used = new Set<string>();
  const out = html.replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (_m, lvl: string, inner: string) => {
    const text = inner.replace(/<[^>]+>/g, "").trim();
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

function parsePost(raw: string): Post {
  const { data, content } = parseFrontmatter(raw);
  const rawHtml = marked.parse(content) as string;
  const { html, toc } = injectHeadingIds(rawHtml);
  const excerpt = content
    .split("\n")
    .find((l: string) => l.trim().length > 60 && !l.startsWith("#"))
    ?.slice(0, 180)
    .trim() ?? "";
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
  .sort((a, b) => (a.date < b.date ? 1 : -1));

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
  return allPosts
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => {
      const aScore = a.category === post.category ? 2 : 0;
      const bScore = b.category === post.category ? 2 : 0;
      return bScore - aScore;
    })
    .slice(0, limit);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
