const fs = require("fs");
const https = require("https");

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
      pattern: /no program specified/i,
      category: null,
    },
  ];

  const match = categoryMappings.find((mapping) =>
    mapping.pattern.test(irccCategory)
  );
  return match ? match.category : null;
}

function fetchData(url) {
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
    invitationsIssued: parseInt(irccDraw.drawSize),
    minimumCRS: parseInt(irccDraw.drawCRS),
    category: mapCategory(irccDraw.drawName),
    year: new Date(irccDraw.drawDate).getFullYear().toString(),
  };
}

async function main() {
  try {
    const existingData = JSON.parse(
      fs.readFileSync("./data/ee-draws.json", "utf8")
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
    existingData.draws.unshift(newDraw); // Add to beginning of array

    existingData.draws.sort((a, b) => b.drawNumber - a.drawNumber);

    fs.writeFileSync(
      "./data/ee-draws.json",
      JSON.stringify(existingData, null, 2),
      "utf8"
    );

    console.log(`Successfully added draw #${latestDrawNumber}`);
    console.log("Category mapped:", latestDraw.drawName, "→", newDraw.category);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

main();
