const express = require("express");
const router = express.Router();
const { getDraws, getLatestDraw } = require("../controllers/draws.controller");

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
router.get("/", getDraws);

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
router.get("/latest", getLatestDraw);

module.exports = router;
