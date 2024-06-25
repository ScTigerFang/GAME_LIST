// tagsController.js
const db = require("../db"); // Adjust the path as necessary

exports.createTag = async (req, res) => {
  const { name } = req.body;
  try {
    const [id] = await db("tags").insert({ name });
    res.status(201).json({ id, name });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create tag", error: error.message });
  }
};

exports.getAllTags = async (req, res) => {
  try {
    const tags = await db("tags").select("*");
    res.status(200).json(tags);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve tags", error: error.message });
  }
};
