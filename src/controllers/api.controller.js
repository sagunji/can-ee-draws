const getApiInfo = (c) => {
  return c.json({
    version: "2.0.0",
    name: "Canada Express Entry Draws API",
    description: "API for accessing Canada Express Entry draw history",
    documentation: "https://can-ee-draws.onrender.com/api/docs",
    endpoints: {
      draws: {
        path: "/api/draws",
        description: "Get all draws with optional year and category filters",
        parameters: ["year", "category"],
      },
      latest: {
        path: "/api/draws/latest",
        description: "Get the draw closest to today's date",
      },
      categories: {
        path: "/api/categories",
        description: "Get all categories",
      },
      pool: {
        path: "/api/pool",
        description: "Get the pool stats",
      },
    },
  });
};

module.exports = {
  getApiInfo,
};
