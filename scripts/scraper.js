const puppeteer = require("puppeteer");

(async () => {
  const url =
    "https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry/rounds-invitations.html";

  console.log("Initiated...");
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });

  console.log("✓ Page loaded");

  await new Promise((resolve) => setTimeout(resolve, 5000));

  const data = await page.evaluate(() => {
    const getText = (selector) =>
      document.querySelector(selector)?.innerText.trim() || null;

    return {
      drawName: getText("span[data-json-replace$='drawName']"),
      drawDate: getText("span[data-json-replace$='drawDateFull']"),
      crsScore: getText("span[data-json-replace$='drawCRS']"),
      invitationsIssued: getText("span[data-json-replace$='drawSize']"),
      tieBreak: getText("span[data-json-replace$='drawCutOff']"),
    };
  });

  console.log(data);

  await browser.close();
})();
