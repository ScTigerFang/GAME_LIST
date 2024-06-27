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
    tags,
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

    tags.forEach(async (tag) => {
      let tagId = await db("tags").where({ name: tag }).select("id").first();
      if (!tagId) {
        [tagId] = await db("tags").insert({ name: tag }, ["id"]);
      }
      await db("game_tags").insert({ game_id: id, tag_id: tagId.id });
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
    const gamesWithTags = await Promise.all(
      games.map(async (game) => {
        const tags = await db("tags")
          .join("game_tags", "tags.id", "game_tags.tag_id")
          .where("game_tags.game_id", game.id)
          .select("tags.name");
        return {
          ...game,
          tags: tags.map((tag) => tag.name),
        };
      })
    );
    res.status(200).json(gamesWithTags);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve games", error: error.message });
  }
};

exports.updateGame = async (req, res) => {
  const { id } = req.params; // Get ID from URL parameters
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
    tags,
  } = req.body;

  try {
    await db("games").where({ id }).update({
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

    // Update tags: First, clear existing tags
    await db("game_tags").where({ game_id: id }).del();

    // Add new tags
    tags.forEach(async (tag) => {
      let tagId = await db("tags").where({ name: tag }).select("id").first();
      if (!tagId) {
        [tagId] = await db("tags").insert({ name: tag }, ["id"]);
      }
      await db("game_tags").insert({ game_id: id, tag_id: tagId.id });
    });

    res.status(200).json({ message: "Game updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update game", error: error.message });
  }
};

exports.deleteGame = async (req, res) => {
  const { id } = req.params; // Assuming ID is passed as a URL parameter

  try {
    // Delete game_tags first to maintain referential integrity
    await db("game_tags").where({ game_id: id }).del();
    // Then delete the game
    const count = await db("games").where({ id }).del();

    if (count > 0) {
      res.status(200).json({ message: "Game deleted successfully" });
    } else {
      res.status(404).json({ message: "Game not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete game", error: error.message });
  }
};
