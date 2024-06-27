import React, { useState, useEffect } from "react";
import "./App.css";
import Theme from "./Theme";
import GameTable from "./Components/GameTable";
import AddGameForm from "./Components/AddGameForm";
import { Button } from "@mui/material";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [tags, setTags] = useState([]);
  const [refreshCounter, setRefreshCounter] = useState(0);

  useEffect(() => {
    // Fetch tags from the backend when the component mounts
    fetch("http://127.0.0.1:6969/api/tags")
      .then((response) => response.json())
      .then((data) => {
        setTags(data); // Assume the backend returns an array of tags
        console.log("Tags fetched:", data);
      })
      .catch((error) => {
        console.error("Failed to fetch tags:", error);
        setTags([]); // Set tags to an empty array on error
      });
  }, []); // Empty dependency array to run only on component mount

  const handleSaveGame = (gameDetails) => {
    console.log("Saving game with details:", gameDetails);

    fetch("http://127.0.0.1:6969/api/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: gameDetails.name,
        gameplay: parseInt(gameDetails.gameplay, 10),
        graphics: parseInt(gameDetails.graphics, 10),
        sound_design: parseInt(gameDetails.sound_design, 10),
        storyline: parseInt(gameDetails.storyline, 10),
        replayability: parseInt(gameDetails.replayability, 10),
        multiplayer: parseInt(gameDetails.multiplayer, 10),
        learning_ease: parseInt(gameDetails.learning_ease, 10),
        notes: gameDetails.notes,
        tags: gameDetails.tags.map((tag) =>
          typeof tag === "string" ? tag : tag.name
        ), // Ensuring tag names are sent as strings
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Game saved successfully:", data);
        setRefreshCounter((prev) => prev + 1); // Increment to trigger re-fetch in GameTable
      })
      .catch((error) => {
        console.error("Error saving game:", error);
      });
  };

  return (
    <Theme>
      <div className="App">
        <header className="App-header">
          <h1>Game List Tracker</h1>
          <Button onClick={() => setModalOpen(true)}>Add New Game</Button>
        </header>
        <AddGameForm
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSaveGame}
          allTags={tags}
        />{" "}
        <GameTable refreshCounter={refreshCounter} />
      </div>
    </Theme>
  );
}

export default App;
