const oinpData = require("../../data/oinp.json");

const getOINPDraws = (c) => {
  const streamKey = c.req.query("stream_key");

  let filteredDraws = [...oinpData.draws];

  if (streamKey) {
    const streamKeyLower = streamKey.toLowerCase();
    filteredDraws = filteredDraws.filter(
      (draw) =>
        draw.stream_key && draw.stream_key.toLowerCase() === streamKeyLower
    );
  }

  return c.json({ draws: filteredDraws });
};

const getOINPDetails = (c) => {
  return c.json({
    meta: oinpData.meta,
    streams: oinpData.streams,
  });
};

module.exports = {
  getOINPDraws,
  getOINPDetails,
};
