#!/usr/bin/env node
// Check internal /blog/... links in Markdown posts and public/llms.txt
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const postsDir = "src/content/posts";
const files = readdirSync(postsDir).filter((f) => f.endsWith(".md"));
const slugs = new Set(files.map((f) => f.replace(/\.md$/, "")));

const targets = [
  ...files.map((f) => join(postsDir, f)),
  "public/llms.txt",
];

const linkRe = /\/blog\/([a-z0-9-]+)/g;
let broken = 0;
for (const path of targets) {
  const txt = readFileSync(path, "utf8");
  const seen = new Set();
  let m;
  while ((m = linkRe.exec(txt))) {
    const slug = m[1];
    if (seen.has(slug)) continue;
    seen.add(slug);
    if (!slugs.has(slug)) {
      console.error(`BROKEN: /blog/${slug}  in  ${path}`);
      broken++;
    }
  }
}
if (broken > 0) {
  console.error(`\n${broken} broken internal link(s).`);
  process.exit(1);
}
console.log(`OK — all /blog/... internal links resolve (${slugs.size} slugs).`);
