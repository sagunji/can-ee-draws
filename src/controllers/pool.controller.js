const drawsData = require("../../data/distribution.json");

const getPoolStats = (c) => {
  if (!drawsData) {
    return c.status(404).json({ error: "No data found" });
  }

  return c.json({ pool: drawsData });
};

module.exports = {
  getPoolStats,
};
