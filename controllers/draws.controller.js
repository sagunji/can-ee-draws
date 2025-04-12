const drawsData = require("../data/ee-draws.json");

const getDraws = (req, res) => {
  const { year, category } = req.query;

  let filteredDraws = [...drawsData.draws];

  if (year) {
    filteredDraws = filteredDraws.filter((draw) => draw.year === year);
    if (filteredDraws.length === 0) {
      return res.json({ draws: [] });
    }
  }

  if (category) {
    const categoryLower = category.toLowerCase();
    filteredDraws = filteredDraws.filter(
      (draw) => draw.category && draw.category.toLowerCase() === categoryLower
    );
    if (filteredDraws.length === 0) {
      return res.json({ draws: [] });
    }
  }

  res.json({ draws: filteredDraws });
};

const getLatestDraw = (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const latestDraw = [...drawsData.draws].reduce((closest, current) => {
    const currentDate = new Date(current.date);
    currentDate.setHours(0, 0, 0, 0);

    if (currentDate > today) return closest;

    if (!closest) return current;

    const closestDate = new Date(closest.date);
    closestDate.setHours(0, 0, 0, 0);

    const currentDiff = Math.abs(today - currentDate);
    const closestDiff = Math.abs(today - closestDate);

    return currentDiff < closestDiff ? current : closest;
  }, null);

  if (!latestDraw) {
    return res.json({ draw: {} });
  }

  res.json({ draw: latestDraw });
};

module.exports = {
  getDraws,
  getLatestDraw,
};
