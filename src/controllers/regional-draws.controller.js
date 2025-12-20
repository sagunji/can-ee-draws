const regionalDrawsData = require("../../data/rcip-fcip-draws.json");

const getRegionalDraws = (c) => {
  const province = c.req.query("province");
  const city = c.req.query("city");
  const programs = c.req.query("programs");

  if (!province) {
    return c.json({ error: "Province parameter is required" }, 400);
  }

  if (!city) {
    return c.json({ error: "City parameter is required" }, 400);
  }

  const provinceLower = province.toLowerCase();
  const cityLower = city.toLowerCase();

  const cityData = regionalDrawsData.cities.find(
    (cityItem) =>
      cityItem.province &&
      cityItem.province.toLowerCase() === provinceLower &&
      cityItem.city.toLowerCase() === cityLower
  );

  if (!cityData) {
    return c.json({ draws: [] });
  }

  let filteredPrograms = [...cityData.programs];

  if (programs) {
    const programList = programs.split(",").map((p) => p.trim().toUpperCase());
    filteredPrograms = cityData.programs.filter((program) =>
      programList.includes(program.program.toUpperCase())
    );
  }

  const draws = filteredPrograms.flatMap((program) =>
    program.records.map((record) => ({
      program: program.program,
      reporting_type: program.reporting_type,
      ...record,
    }))
  );

  return c.json({ draws });
};

const getRegionalDrawsDetails = (c) => {
  const province = c.req.query("province");

  let filteredCities = [...regionalDrawsData.cities];

  if (province) {
    const provinceLower = province.toLowerCase();
    filteredCities = filteredCities.filter(
      (city) => city.province && city.province.toLowerCase() === provinceLower
    );
  }

  const details = {};

  filteredCities.forEach((city) => {
    const provinceKey = city.province || "Unknown";

    if (!details[provinceKey]) {
      details[provinceKey] = [];
    }

    const cityInfo = {
      city: city.city,
      data_source: city.data_source,
      source_url: city.source_url,
      last_updated: city.last_updated || null,
      notes: city.notes || null,
      available_programs: city.programs.map((program) => ({
        program: program.program,
        reporting_type: program.reporting_type,
        record_count: program.records.length,
      })),
    };

    details[provinceKey].push(cityInfo);
  });

  return c.json({ ...details });
};

module.exports = {
  getRegionalDraws,
  getRegionalDrawsDetails,
};
