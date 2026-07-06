import { defineMcp } from "@lovable.dev/mcp-js";
import listCategories from "./tools/list-categories";
import listPosts from "./tools/list-posts";
import getPost from "./tools/get-post";
import searchPosts from "./tools/search-posts";
import estimateRepairCost from "./tools/estimate-repair-cost";
import lookupErrorCode from "./tools/lookup-error-code";

export default defineMcp({
  name: "home-appliance-cost-guide-mcp",
  title: "Home Appliance Cost Guide",
  version: "0.1.0",
  instructions:
    "Tools for Home Appliance Cost Guide (whatrepaircosts.com). Use `list_categories` and `list_posts` to browse articles, `get_post` to fetch a full article, `search_posts` for full-text search, `estimate_repair_cost` for US appliance repair price estimates by symptom and region, and `lookup_error_code` for documented brand error codes (Bosch, LG, Samsung, Whirlpool, GE).",
  tools: [listCategories, listPosts, getPost, searchPosts, estimateRepairCost, lookupErrorCode],
});
