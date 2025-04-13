const express = require("express");
const router = express.Router();
const { getCategories } = require("../controllers/category.controller");

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Get all categories
 *     description: Retrieve all unique categories from Express Entry draws
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 categories:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["PNP", "CEC"]
 */
router.get("/", getCategories);

module.exports = router;
