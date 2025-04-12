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
 */
router.get("/", (req, res) => {
  const { year } = req.query;

  if (year) {
    if (drawsData.draws[year]) {
      return res.json({ draws: drawsData.draws[year] });
    }
    return res.status(404).json({ error: "Year not found" });
  }

  res.json(drawsData);
});

module.exports = router;
