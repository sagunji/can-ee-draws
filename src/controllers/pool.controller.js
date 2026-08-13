const drawsData = require("../../data/distribution.json");

const toPoolSnapshot = (draw) => {
  if (!draw) return null;

  return {
    drawNumber: draw.drawNumber,
    drawDate: draw.drawDate,
    ranges: draw.ranges,
  };
};

const getMondayOfWeek = (dateStr) => {
  const [year, month, day] = dateStr.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  const dayOfWeek = date.getUTCDay();
  const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  date.setUTCDate(date.getUTCDate() - daysFromMonday);
  return date.toISOString().slice(0, 10);
};

const getPreviousWeekFirstDraw = (draws, current) => {
  const currentWeekStart = getMondayOfWeek(current.drawDate);

  const earlierDraws = draws.filter(
    (draw) => getMondayOfWeek(draw.drawDate) < currentWeekStart
  );

  if (earlierDraws.length === 0) {
    return null;
  }

  const previousWeekStart = earlierDraws.reduce((latestWeekStart, draw) => {
    const weekStart = getMondayOfWeek(draw.drawDate);
    return weekStart > latestWeekStart ? weekStart : latestWeekStart;
  }, getMondayOfWeek(earlierDraws[0].drawDate));

  return earlierDraws
    .filter((draw) => getMondayOfWeek(draw.drawDate) === previousWeekStart)
    .reduce((first, draw) =>
      draw.drawNumber < first.drawNumber ? draw : first
    );
};

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

  const current = drawsData.reduce((latest, draw) => {
    return draw.drawNumber > latest.drawNumber ? draw : latest;
  }, drawsData[0]);

  const previous = getPreviousWeekFirstDraw(drawsData, current);

  return c.json({
    pool: {
      current: toPoolSnapshot(current),
      previous: toPoolSnapshot(previous),
    },
  });
};

module.exports = {
  getPoolStats,
  getPoolProgress,
};
