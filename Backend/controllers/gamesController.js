// gamesController.js
const db = require("../db"); // Adjust the path as necessary

exports.createGame = async (req, res) => {
  const {
    name,
    notes,
    gameplay,
    graphics,
    sound_design,
    storyline,
    replayability,
    multiplayer,
    learning_ease,
  } = req.body;
  try {
    const [id] = await db("games").insert({
      name,
      notes,
      gameplay,
      graphics,
      sound_design,
      storyline,
      replayability,
      multiplayer,
      learning_ease,
    });
    res.status(201).json({ id, name });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create game", error: error.message });
  }
};

exports.getAllGames = async (req, res) => {
  try {
    const games = await db("games").select("*");
    res.status(200).json(games);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve games", error: error.message });
  }
};
