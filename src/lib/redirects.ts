/**
 * Permanent (301) redirects for merged/retired blog posts.
 *
 * Where redirects live: this map is the single source of truth. It is applied
 * in `src/routes/blog.$slug.tsx` (loader throws a 301 redirect before rendering),
 * so both SSR requests and client-side navigations are handled. Retired slugs are
 * also excluded from sitemap.xml and RSS automatically because their Markdown
 * source files no longer exist.
 */
export const POST_REDIRECTS: Record<string, string> = {
  "average-appliance-repair-cost": "average-appliance-repair-cost-by-type",
  "is-a-home-warranty-worth-it-for-appliances":
    "are-home-warranties-worth-it-for-appliances",
  "repair-or-replace-appliance-guide": "appliance-repair-vs-replacement",
  "refrigerator-repair-cost": "refrigerator-repair-cost-guide",
  "washing-machine-repair-vs-replace":
    "should-you-repair-or-replace-a-washing-machine",
};

