import React, { useState, useEffect } from "react";
import "./App.css";
import Theme from "./Theme";
import GameTable from "./Components/GameTable";
import AddGameForm from "./Components/AddGameForm";
import { Button } from "@mui/material";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    // Fetch tags from the backend
    fetch("http://127.0.0.1:6969/api/tags")
      .then((response) => response.json())
      .then((data) => setTags(data))
      .catch((error) => console.error("Error fetching tags:", error));
  }, []);

  const handleSaveGame = (gameDetails) => {
    console.log("Saving game:", gameDetails);
    // Include the API call here to save the game
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
        />
        <GameTable />
      </div>
    </Theme>
  );
}

export default App;
