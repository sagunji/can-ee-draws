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
      poolProgress: {
        path: "/api/pool/progress",
        description: "Get the pool progress",
      },
      regionalDraws: {
        path: "/api/draws/regional",
        description:
          "Get regional draws (RCIP/FCIP) for a specific province and city, with optional programs filter",
        parameters: [
          "province (required)",
          "city (required)",
          "programs (optional)",
        ],
      },
      regionalDrawsDetails: {
        path: "/api/draws/regional/details",
        description:
          "Get regional draws details organized by province -> cities -> available programs",
        parameters: ["province"],
      },
      oinpDraws: {
        path: "/api/draws/oinp",
        description:
          "Get OINP (Ontario Immigrant Nominee Program) draws with optional stream_key filter",
        parameters: ["stream_key (optional)"],
      },
      oinpDetails: {
        path: "/api/draws/oinp/details",
        description:
          "Get OINP details including available streams with keys and natural names",
      },
    },
  });
};

module.exports = {
  getApiInfo,
};
