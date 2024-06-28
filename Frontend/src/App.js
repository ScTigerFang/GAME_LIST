import React, { useState, useEffect } from "react";
import "./App.css";
import Theme from "./Theme";
import GameTable from "./Components/GameTable";
import GameForm from "./Components/GameForm";
import { Button } from "@mui/material";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState(null); // Manage selected game
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
    const url = selectedGame
      ? `http://127.0.0.1:6969/api/games/${selectedGame.id}`
      : "http://127.0.0.1:6969/api/games";
    const method = selectedGame ? "PUT" : "POST";
    const tags = gameDetails.tags.map((tag) =>
      typeof tag === "object" ? tag.name : tag
    ); // Ensure tags are in the correct format

    fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...gameDetails,
        tags,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        setModalOpen(false);
        setRefreshCounter((prev) => prev + 1); // Trigger refresh
        setSelectedGame(null); // Reset selected game
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
          <Button
            onClick={() => {
              setModalOpen(true);
              setSelectedGame(null); // Reset for adding new game
            }}
          >
            Add New Game
          </Button>
        </header>
        <GameForm
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
            setSelectedGame(null);
          }}
          onSave={handleSaveGame}
          allTags={tags}
          initialGameData={selectedGame}
        />
        <GameTable
          refreshCounter={refreshCounter}
          setModalOpen={setModalOpen}
          setSelectedGame={setSelectedGame}
        />
      </div>
    </Theme>
  );
}

export default App;
