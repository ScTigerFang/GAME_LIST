import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 130 },
  { field: "tags", headerName: "Tags", width: 200 },
  { field: "gameplay", headerName: "Gameplay", type: "number", width: 100 },
  { field: "graphics", headerName: "Graphics", type: "number", width: 100 },
  {
    field: "sound_design",
    headerName: "Sound Design",
    type: "number",
    width: 130,
  },
  { field: "storyline", headerName: "Storyline", type: "number", width: 100 },
  {
    field: "replayability",
    headerName: "Replayability",
    type: "number",
    width: 130,
  },
  {
    field: "multiplayer",
    headerName: "Multiplayer",
    type: "number",
    width: 110,
  },
  {
    field: "learning_ease",
    headerName: "Learning Ease",
    type: "number",
    width: 120,
  },
  { field: "notes", headerName: "Notes", width: 200 },
];

export default function GameTable({ refreshCounter }) {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:6969/api/games")
      .then((response) => response.json())
      .then((data) => {
        const processedData = data.map((game) => ({
          ...game,
          tags: game.tags ? game.tags.join(", ") : "",
        }));
        setGames(processedData);
      })
      .catch((error) => console.error("Error fetching games:", error));
  }, [refreshCounter]); // Dependency on refreshCounter triggers re-fetch

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={games}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
}
