const drawsData = require("../../data/distribution.json");

const getPoolStats = (c) => {
  if (!drawsData || !Array.isArray(drawsData) || drawsData.length === 0) {
    return c.status(404).json({ error: "No data found" });
  }

  const latestDraw = drawsData.reduce((latest, current) => {
    return current.drawNumber > latest.drawNumber ? current : latest;
  }, drawsData[0]);

  return c.json({ pool: latestDraw });
};

const getPoolProgress = (c) => {
  if (!drawsData || !Array.isArray(drawsData) || drawsData.length === 0) {
    return c.status(404).json({ error: "No data found" });
  }

  const sortedDraws = [...drawsData].sort(
    (a, b) => b.drawNumber - a.drawNumber
  );

  const [current, previous] = sortedDraws.slice(0, 2);

  const comparison = {
    current: {
      drawNumber: current.drawNumber,
      drawDate: current.drawDate,
      ranges: current.ranges,
    },
    previous: previous
      ? {
          drawNumber: previous.drawNumber,
          drawDate: previous.drawDate,
          ranges: previous.ranges,
        }
      : null,
  };

  return c.json({ pool: comparison });
};

module.exports = {
  getPoolStats,
  getPoolProgress,
};
