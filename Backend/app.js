// app.js
const express = require("express");
const gamesRoutes = require("./routes/gamesRoutes");
const tagsRoutes = require("./routes/tagsRoutes");
const cors = require("cors");

const app = express(); // Initialize the app before using it
const port = 3000;

app.use(cors()); // Configures CORS with default settings; customize as needed
app.use(express.json()); // This line should come after initializing 'app' and setting up CORS
app.use("/api", gamesRoutes);
app.use("/api", tagsRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Error handling middleware should also come after initializing 'app'
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
