const drawsData = require("../data/distribution.json");

const getPoolStats = (_, res) => {
  if (!drawsData) {
    return res.status(404).json({ error: "No data found" });
  }

  res.json({ pool: drawsData });
};

module.exports = {
  getPoolStats,
};
