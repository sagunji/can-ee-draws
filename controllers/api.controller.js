const getApiInfo = (req, res) => {
  res.json({
    version: "1.0.0",
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
    },
  });
};

module.exports = {
  getApiInfo,
};
