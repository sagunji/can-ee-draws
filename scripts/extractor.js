import { writeFile, readFile } from "node:fs/promises";
import https from "node:https";

const scoreRanges = [
  {
    key: "dd1",
    range: "601-1200",
    value: "",
  },
  {
    key: "dd2",
    range: "501-600",
    value: "",
  },
  {
    key: "dd3",
    range: "451-500",
    value: "",
  },
  {
    key: "dd4",
    range: "491-500",
    value: "",
  },
  {
    key: "dd5",
    range: "481-490",
    value: "",
  },
  {
    key: "dd6",
    range: "471-480",
    value: "",
  },
  {
    key: "dd7",
    range: "461-470",
    value: "",
  },
  {
    key: "dd8",
    range: "451-460",
    value: "",
  },
  {
    key: "dd9",
    range: "401-450",
    value: "",
  },
  {
    key: "dd10",
    range: "441-450",
    value: "",
  },
  {
    key: "dd11",
    range: "431-440",
    value: "",
  },
  {
    key: "dd12",
    range: "421-430",
    value: "",
  },
  {
    key: "dd13",
    range: "411-420",
    value: "",
  },
  {
    key: "dd14",
    range: "401-410",
    value: "",
  },
  {
    key: "dd15",
    range: "351-400",
    value: "",
  },
  {
    key: "dd16",
    range: "301-350",
    value: "",
  },
  {
    key: "dd17",
    range: "0-300",
    value: "",
  },
  {
    key: "dd18",
    range: "Total",
    value: "",
  },
];

function mapCategory(irccCategory) {
  const categoryMappings = [
    {
      pattern: /provincial nominee program/i,
      category: "PNP",
    },
    {
      pattern: /french language proficiency/i,
      category: "French",
    },
    {
      pattern: /canadian experience class/i,
      category: "CEC",
    },
    {
      pattern: /healthcare/i,
      category: "Healthcare",
    },
    {
      pattern: /trade/i,
      category: "Trades",
    },
    {
      pattern: /stem/i,
      category: "STEM",
    },
    {
      pattern: /transport/i,
      category: "Transport",
    },
    {
      pattern: /agriculture|agri-food/i,
      category: "Agriculture",
    },
    {
      pattern: /^general$/i,
      category: "General",
    },
    {
      pattern: /^education$/i,
      category: "Education",
    },
    {
      pattern: /no program specified/i,
      category: null,
    },
  ];

  const match = categoryMappings.find((mapping) =>
    mapping.pattern.test(irccCategory)
  );
  return match ? match.category : null;
}

async function fetchData(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = "";

        res.on("data", (chunk) => {
          data += chunk;
        });

        res.on("end", () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(e);
          }
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}

function convertDrawFormat(irccDraw) {
  return {
    drawNumber: parseInt(irccDraw.drawNumber),
    date: irccDraw.drawDate,
    invitationsIssued: parseInt(irccDraw.drawSize.replace(/,/g, ""), 10),
    minimumCRS: parseInt(irccDraw.drawCRS.replace(/,/g, ""), 10),
    category: mapCategory(irccDraw.drawName),
    year: new Date(irccDraw.drawDate).getFullYear().toString(),
  };
}

function mapDrawDistribution(latestDraw) {
  return {
    drawNumber: parseInt(latestDraw.drawNumber),
    drawDate: latestDraw.drawDate,
    ranges: scoreRanges.map((range) => ({
      ...range,
      value: latestDraw[range.key] || "0",
    })),
  };
}

async function writeDistributionToFile(distribution) {
  try {
    await writeFile(
      "./data/distribution.json",
      JSON.stringify(distribution, null, 2),
      "utf8"
    );
    console.log(`✅ Distribution updated.`);
  } catch (error) {
    console.error("Error writing distribution file:", error);
    throw error;
  }
}

async function main() {
  try {
    const existingData = JSON.parse(
      await readFile("./data/ee-draws.json", "utf8")
    );

    const irccData = await fetchData(
      "https://www.canada.ca/content/dam/ircc/documents/json/ee_rounds_123_en.json"
    );

    if (!irccData.rounds || irccData.rounds.length === 0) {
      console.log("No draws found in IRCC data");
      return;
    }

    const latestDraw = irccData.rounds[0];
    const latestDrawNumber = parseInt(latestDraw.drawNumber);

    const drawExists = existingData.draws.some(
      (draw) => draw.drawNumber === latestDrawNumber
    );

    if (drawExists) {
      console.log(`Draw #${latestDrawNumber} already exists in the database`);
      return;
    }

    const newDraw = convertDrawFormat(latestDraw);
    existingData.draws.unshift(newDraw);

    existingData.draws.sort((a, b) => b.drawNumber - a.drawNumber);

    await writeFile(
      "./data/ee-draws.json",
      JSON.stringify(existingData, null, 2),
      "utf8"
    );

    const distribution = mapDrawDistribution(latestDraw);

    await writeDistributionToFile(distribution);

    console.log(`Successfully added draw #${latestDrawNumber}`);
    console.log("Category mapped:", latestDraw.drawName, "→", newDraw.category);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

main();
