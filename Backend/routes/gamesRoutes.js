const express = require("express");
const router = express.Router();
const gamesController = require("../controllers/gamesController");

// Create a new game
router.post("/games", gamesController.createGame);

// Get all games
router.get("/games", gamesController.getAllGames);

// Update a specific game
router.put("/games/:id", gamesController.updateGame); // Use PUT for updates

// Delete a specific game
router.delete("/games/:id", gamesController.deleteGame); // Use DELETE for deletions

module.exports = router;
