const express = require("express");
const router = express.Router();
const JokesController = require("../controllers/jokeController");
const { authenticateToken } = require("../middleware/auth.middleware");

/**
 * @swagger
 * /api/jokes/moderate:
 *   get:
 *     summary: Get list of pending jokes for moderation
 *     tags:
 *       - Jokes Moderation
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of pending jokes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   content:
 *                     type: string
 *                   type:
 *                     type: string
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get("/moderate", authenticateToken, JokesController.getPendingJokes);

/**
 * @swagger
 * /api/jokes/approve:
 *   post:
 *     summary: Approve a joke and move it to the delivery service
 *     tags:
 *       - Jokes Moderation
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               jokeId:
 *                 type: string
 *               content:
 *                 type: string
 *               type:
 *                 type: string
 *     responses:
 *       200:
 *         description: Joke approved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post("/approve", authenticateToken, JokesController.approveJoke);

/**
 * @swagger
 * /api/jokes/reject/{jokeId}:
 *   delete:
 *     summary: Reject a pending joke by ID
 *     tags:
 *       - Jokes Moderation
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: jokeId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the joke to reject
 *     responses:
 *       200:
 *         description: Joke rejected successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Joke not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.delete("/reject/:jokeId", authenticateToken, JokesController.rejectJoke);

module.exports = router;
