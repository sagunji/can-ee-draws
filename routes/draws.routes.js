const express = require("express");
const router = express.Router();
const drawsData = require("../data/ee-draws.json");

/**
 * @swagger
 * /api/draws:
 *   get:
 *     summary: Get all draws
 *     description: Retrieve all Express Entry draws
 *     parameters:
 *       - in: query
 *         name: year
 *         schema:
 *           type: string
 *         description: Filter draws by year (e.g., 2023, 2024)
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter draws by category (e.g., PNP, CEC, French, Healthcare)
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 draws:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       drawNumber:
 *                         type: number
 *                       date:
 *                         type: string
 *                       invitationsIssued:
 *                         type: number
 *                       minimumCRS:
 *                         type: number
 *                       category:
 *                         type: string
 *                         nullable: true
 *                       year:
 *                         type: string
 */

router.get("/", (req, res) => {
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
});

/**
 * @swagger
 * /api/draws/latest:
 *   get:
 *     summary: Get the latest draw
 *     description: Retrieve the most recent Express Entry draw (closest to today's date)
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 draw:
 *                   type: object
 *                   properties:
 *                     drawNumber:
 *                       type: number
 *                     date:
 *                       type: string
 *                     invitationsIssued:
 *                       type: number
 *                     minimumCRS:
 *                       type: number
 *                     category:
 *                       type: string
 *                       nullable: true
 *                     year:
 *                       type: string
 */
router.get("/latest", (req, res) => {
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
});

module.exports = router;
