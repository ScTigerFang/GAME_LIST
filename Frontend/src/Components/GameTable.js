import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Snackbar } from "@mui/material";

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

export default function GameTable({
  refreshCounter,
  setModalOpen,
  setSelectedGame,
}) {
  const [games, setGames] = useState([]);
  const [snackPack, setSnackPack] = useState([]);
  const [open, setOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState(undefined);

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
  }, [refreshCounter]);

  useEffect(() => {
    if (snackPack.length && !messageInfo) {
      // Set a new snack when we add one
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpen(true);
    } else if (snackPack.length && messageInfo && open) {
      // Close an old snack when a new one is added
      setOpen(false);
    }
  }, [snackPack, messageInfo, open]);

  const handleClick = (message) => {
    setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  const handleEdit = (game) => {
    setSelectedGame(game);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this game?")) {
      fetch(`http://127.0.0.1:6969/api/games/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          handleClick("Game deleted successfully.");
          setGames(games.filter((game) => game.id !== id)); // Optimistically remove the game from UI
        })
        .catch((error) => {
          console.error("Failed to delete game:", error);
          handleClick("Failed to delete game.");
        });
    }
  };

  const actionColumn = [
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      width: 150,
      renderCell: (params) => (
        <>
          <Button
            color="primary"
            size="small"
            onClick={() => handleEdit(params.row)}
          >
            Edit
          </Button>
          <Button
            color="secondary"
            size="small"
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={games}
        columns={columns.concat(actionColumn)}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
      <Snackbar
        key={messageInfo ? messageInfo.key : undefined}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        onExited={handleExited}
        message={messageInfo ? messageInfo.message : undefined}
      />
    </div>
  );
}
