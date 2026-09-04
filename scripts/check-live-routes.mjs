#!/usr/bin/env node

const origin = (process.env.SITE_ORIGIN || "https://whatrepaircosts.com").replace(/\/$/, "");
const paths = ["/", "/blog", "/sitemap.xml", "/llms.txt", "/about", "/how-we-estimate-repair-costs", "/editorial-policy", "/blog/american-home-shield-review", "/blog/refrigerator-repair-cost-guide", "/error-codes"];
const failures = [];
for (const path of paths) {
  let passed = false;
  let last = "unknown error";
  for (let attempt = 1; attempt <= 3; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 25_000);
    const started = Date.now();
    try {
      const response = await fetch(`${origin}${path}`, { redirect: "follow", signal: controller.signal, headers: { "user-agent": "HomeFix-Crawl-Health/1.0 (+https://whatrepaircosts.com)" } });
      last = `HTTP ${response.status} in ${Date.now() - started}ms`;
      console.log(`${path}: ${last} (attempt ${attempt})`);
      if (response.status < 500) { passed = true; break; }
    } catch (error) {
      last = error?.name === "AbortError" ? "timeout after 25000ms" : String(error);
      console.error(`${path}: ${last} (attempt ${attempt})`);
    } finally { clearTimeout(timer); }
    if (attempt < 3) await new Promise((resolve) => setTimeout(resolve, attempt * 2000));
  }
  if (!passed) failures.push({ path, last });
}
if (failures.length) {
  console.error("Live crawl failures after retries:", failures);
  process.exit(1);
}
console.log(`All ${paths.length} representative routes responded without a 5xx.`);
