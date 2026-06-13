import yaml from "js-yaml";
import { marked } from "marked";

import fridgeImg from "@/assets/post-fridge.jpg";
import washerImg from "@/assets/post-washer.jpg";
import dishwasherImg from "@/assets/post-dishwasher.jpg";

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
};

const imageMap: Record<string, string> = {
  fridge: fridgeImg,
  washer: washerImg,
  dishwasher: dishwasherImg,
};

// Vite imports raw markdown at build time. Migration to a CMS later is just
// swapping this glob for a fetch.
const files = import.meta.glob("../content/posts/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

marked.setOptions({ gfm: true, breaks: false });

function parsePost(raw: string): Post {
  const { data, content } = matter(raw);
  const html = marked.parse(content) as string;
  const excerpt = content
    .split("\n")
    .find((l) => l.trim().length > 60 && !l.startsWith("#"))
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
  });
}
