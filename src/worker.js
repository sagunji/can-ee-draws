import { Hono } from "hono";
import { cors } from "hono/cors";
import { getApiInfo } from "./controllers/api.controller";
import { getPoolStats, getPoolProgress } from "./controllers/pool.controller";
import { getCategories } from "./controllers/category.controller";
import { getDraws, getLatestDraw } from "./controllers/draws.controller";
import { getRegionalDraws, getRegionalDrawsDetails } from "./controllers/regional-draws.controller";

const app = new Hono();

app.use("*", cors());

app.get("/", async (c) => {
  return await getApiInfo(c);
});

app.get("/api/categories", async (c) => {
  return await getCategories(c);
});

app.get("/api/pool", async (c) => {
  return await getPoolStats(c);
});

app.get("/api/pool/progress", async (c) => {
  return await getPoolProgress(c);
});

app.get("/api/draws", async (c) => {
  return await getDraws(c);
});

app.get("/api/draws/latest", async (c) => {
  return await getLatestDraw(c);
});

app.get("/api/draws/regional", async (c) => {
  return await getRegionalDraws(c);
});

app.get("/api/draws/regional/details", async (c) => {
  return await getRegionalDrawsDetails(c);
});

// Export the fetch handler for Cloudflare Workers
export default {
  fetch: app.fetch,
};
