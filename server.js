const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const drawsRoutes = require("./routes/draws.routes");
const poolRoutes = require("./routes/pool.routes");
const categoriesRoutes = require("./routes/category.routes");
const { getApiInfo } = require("./controllers/api.controller");

const app = express();
const port = process.env.PORT || 3000;

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Canada Express Entry Draws API",
      version: "1.0.0",
      description: "API for accessing Canada Express Entry draw history",
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(express.json());
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/api", getApiInfo);
app.use("/api/draws", drawsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/pool", poolRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
  console.log(
    `Swagger documentation available at http://localhost:${port}/api/docs`
  );
});

// Export the fetch handler for Cloudflare Workers
export default {
  fetch: app.fetch,
};
