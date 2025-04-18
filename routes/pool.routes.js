const express = require("express");
const router = express.Router();
const { getPoolStats } = require("../controllers/pool.controller");

/**
 * @swagger
 * /api/pool:
 *   get:
 *     summary: Get latest candidate pool details
 *     description: Retrieve CRS score distribution of candidates in the Express Entry pool
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 drawNumber:
 *                   type: string
 *                   description: The draw number this distribution is from
 *                   example: "342"
 *                 drawDate:
 *                   type: string
 *                   format: date
 *                   description: Date of the draw
 *                   example: "2025-04-14"
 *                 ranges:
 *                   type: array
 *                   description: CRS score ranges and their corresponding candidate counts
 *                   items:
 *                     type: object
 *                     properties:
 *                       key:
 *                         type: string
 *                         description: Distribution key identifier
 *                         example: "dd1"
 *                       range:
 *                         type: string
 *                         description: CRS score range
 *                         example: "601-1200"
 *                       value:
 *                         type: string
 *                         description: Number of candidates in this range
 *                         example: "816"
 *                   example:
 *                     - key: "dd1"
 *                       range: "601-1200"
 *                       value: "816"
 *                     - key: "dd2"
 *                       range: "501-600"
 *                       value: "19,782"
 *                     - key: "dd18"
 *                       range: "Total"
 *                       value: "244,282"
 *       404:
 *         description: Distribution data not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Pool distribution data not found"
 */
router.get("/", getPoolStats);

module.exports = router;
