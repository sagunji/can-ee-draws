import { Hono } from "hono";
import { cors } from "hono/cors";
import { getApiInfo } from "./controllers/api.controller";
import { getPoolStats } from "./controllers/pool.controller";
import { getCategories } from "./controllers/category.controller";
import { getDraws, getLatestDraw } from "./controllers/draws.controller";

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

app.get("/api/draws", async (c) => {
  return await getDraws(c);
});

app.get("/api/draws/latest", async (c) => {
  return await getLatestDraw(c);
});

// Export the fetch handler for Cloudflare Workers
export default {
  fetch: app.fetch,
};
