const express = require("express");
const router = express.Router();
const JokesController = require("../controllers/jokeController");
const { authenticateToken } = require("../middleware/auth.middleware");

router.get("/moderate", authenticateToken, JokesController.getPendingJokes);
router.post("/approve", authenticateToken, JokesController.approveJoke);
router.delete("/reject/:jokeId", authenticateToken, JokesController.rejectJoke);

module.exports = router;
