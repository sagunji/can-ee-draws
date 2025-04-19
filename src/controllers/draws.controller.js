const drawsData = require("../../data/ee-draws.json");

const getDraws = (c) => {
  const year = c.req.query("year");
  const category = c.req.query("category");

  let filteredDraws = [...drawsData.draws];

  if (year) {
    filteredDraws = filteredDraws.filter((draw) => draw.year === year);
    if (filteredDraws.length === 0) {
      return c.json({ draws: [] });
    }
  }

  if (category) {
    const categoryLower = category.toLowerCase();
    filteredDraws = filteredDraws.filter(
      (draw) => draw.category && draw.category.toLowerCase() === categoryLower
    );
    if (filteredDraws.length === 0) {
      return c.json({ draws: [] });
    }
  }

  return c.json({ draws: filteredDraws });
};

const getLatestDraw = (c) => {
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
    return c.json({ draw: {} });
  }

  return c.json({ draw: latestDraw });
};

module.exports = {
  getDraws,
  getLatestDraw,
};
