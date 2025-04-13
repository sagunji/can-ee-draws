const drawsData = require("../data/ee-draws.json");

const getCategories = (_, res) => {
  const categories = [
    ...new Set(drawsData.draws.map((draw) => draw.category).filter((x) => x)),
  ];

  res.json({ categories });
};

module.exports = {
  getCategories,
};
