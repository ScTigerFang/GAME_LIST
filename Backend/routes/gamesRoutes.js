// gamesRoutes.js
const express = require("express");
const router = express.Router();
const gamesController = require("../controllers/gamesController");

router.post("/games", gamesController.createGame);
router.get("/games", gamesController.getAllGames);

module.exports = router;
