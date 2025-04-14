const drawsData = require("../data/ee-draws.json");

const getCategories = (_, res) => {
  const categoryCounts = drawsData.draws.reduce((acc, draw) => {
    if (draw.category) {
      acc[draw.category] = (acc[draw.category] || 0) + 1;
    }
    return acc;
  }, {});

  const sortedCategories = Object.entries(categoryCounts)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count)
    .map((item) => item.category);

  res.json({ categories: sortedCategories });
};

module.exports = {
  getCategories,
};
