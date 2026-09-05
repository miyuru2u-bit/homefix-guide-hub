#!/usr/bin/env node
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import yaml from "js-yaml";

const dir = "src/content/posts";
const files = readdirSync(dir).filter((name) => name.endsWith(".md")).sort();
const required = ["title", "slug", "metaDescription", "category", "tags", "date", "author", "image", "imageAlt", "quickAnswer", "faq"];
const validCategories = new Set(["repair-cost-guides", "home-warranty-guides", "repair-vs-replace", "appliance-error-codes", "buyer-guides"]);
const commercial = /(?:review|best-|cheapest-home-warranty|\bvs\b|warranty)/i;
const numeric = /(?:cost|price|lifespan|reliable|expensive|cheapest)/i;
const minimumBodyWords = 1000;
const slugs = new Map();
const errors = [];
const warnings = [];

function report(level, file, message) {
  (level === "error" ? errors : warnings).push({ file, message });
}

function countBodyWords(markdown) {
  const text = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/~~~[\s\S]*?~~~/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&(?:[a-zA-Z]+|#\d+|#x[\da-fA-F]+);/g, " ");

  return (text.match(/[\p{L}\p{N}]+(?:['’.-][\p{L}\p{N}]+)*/gu) ?? []).length;
}

for (const file of files) {
  const raw = readFileSync(join(dir, file), "utf8");
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    report("error", file, "missing valid YAML frontmatter");
    continue;
  }
  let data;
  try { data = yaml.load(match[1]) ?? {}; }
  catch (error) {
    report("error", file, `invalid YAML: ${error.message}`);
    continue;
  }
  const body = match[2];
  const bodyWordCount = countBodyWords(body);
  if (bodyWordCount < minimumBodyWords) report("error", file, `Markdown body has ${bodyWordCount} words; minimum is ${minimumBodyWords}`);
  for (const key of required) {
    if (data[key] == null || data[key] === "" || (Array.isArray(data[key]) && data[key].length === 0)) report("error", file, `missing required field: ${key}`);
  }
  if (data.category && !validCategories.has(data.category)) report("error", file, `unknown category: ${data.category}`);
  if (data.slug) {
    if (slugs.has(data.slug)) report("error", file, `duplicate slug also used by ${slugs.get(data.slug)}`);
    slugs.set(data.slug, file);
    if (`${data.slug}.md` !== file) report("warning", file, "filename does not match slug");
  }
  if (typeof data.metaDescription === "string" && (data.metaDescription.length < 90 || data.metaDescription.length > 165)) report("warning", file, `meta description length is ${data.metaDescription.length}`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(data.date ?? ""))) report("error", file, "date must use YYYY-MM-DD");
  const today = new Date().toISOString().slice(0, 10);
  if (data.date > today) report("error", file, `future publication date: ${data.date}`);
  if (!data.updated) report("warning", file, "missing updated date");
  if (!data.revisionSummary) report("warning", file, "missing revision summary");
  if (!data.factCheckStatus) report("warning", file, "factCheckStatus is implicit rather than explicitly recorded");
  if (!Array.isArray(data.sources) || data.sources.length === 0) {
    if (commercial.test(`${data.slug} ${data.title}`) || numeric.test(`${data.slug} ${data.title}`)) report("warning", file, "commercial or numerical article has no sources");
  } else {
    data.sources.forEach((source, index) => {
      if (!source?.title) report("error", file, `source ${index + 1} has no title`);
      if (!source?.url) report("warning", file, `source ${index + 1} has no URL`);
    });
  }
  if (Array.isArray(data.faq) && data.faq.length && /^##\s+(?:frequently asked questions|faqs?)\s*$/im.test(body)) report("error", file, "FAQ exists in both frontmatter and Markdown body");
  if (/\b(?:all 50 states except|guaranteed|always covered|never denied)\b/i.test(body)) report("warning", file, "contains an absolute claim requiring manual review");
  if (/\b(?:technician interviews?|proprietary service-call data)\b/i.test(body)) report("warning", file, "contains an expertise or proprietary-data claim requiring evidence");
  if (commercial.test(`${data.slug} ${data.title}`) && !/affiliate|commission|no paid|editorial independence/i.test(body)) report("warning", file, "commercial article lacks an in-body disclosure");
}

console.log(`Audited ${files.length} Markdown articles (minimum ${minimumBodyWords} body words each).`);
for (const item of errors) console.error(`ERROR ${item.file}: ${item.message}`);
for (const item of warnings) console.warn(`WARN  ${item.file}: ${item.message}`);
console.log(`Summary: ${errors.length} errors, ${warnings.length} warnings.`);
if (errors.length) process.exit(1);
if (process.argv.includes("--strict") && warnings.length) process.exit(1);
