import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  Autocomplete,
  Grid,
} from "@mui/material";

function GameForm({ open, onClose, onSave, allTags, initialGameData }) {
  const initialState = {
    name: "",
    gameplay: "",
    graphics: "",
    sound_design: "",
    storyline: "",
    replayability: "",
    multiplayer: "",
    learning_ease: "",
    notes: "",
    tags: [],
  };

  const [gameDetails, setGameDetails] = useState(initialState);

  // Sync game details with incoming data
  useEffect(() => {
    setGameDetails(
      initialGameData
        ? {
            ...initialGameData,
            tags: Array.isArray(initialGameData.tags)
              ? initialGameData.tags
              : initialGameData.tags.split(", "),
          }
        : initialState
    );
  }, [initialGameData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setGameDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagsChange = (event, newValue) => {
    setGameDetails((prev) => ({ ...prev, tags: newValue }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(gameDetails);
    onClose();
  };

  const totalScore = [
    "gameplay",
    "graphics",
    "sound_design",
    "storyline",
    "replayability",
    "multiplayer",
    "learning_ease",
  ].reduce((sum, key) => sum + Number(gameDetails[key] || 0), 0);

  const getFlameIntensityStyle = (score) => ({
    "& .MuiInputBase-input": {
      color: "#ffca28",
      textShadow: `0 0 ${3 + 3 * (score / 100)}px #FFD54F, 0 0 ${
        5 + 5 * (score / 100)
      }px #FFB300, 0 0 ${10 + 10 * (score / 100)}px #FF8F00`,
      textAlign: "center",
    },
  });

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          overflowY: "auto",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">
                {initialGameData ? "Edit Game" : "Add New Game"}
              </Typography>
              <TextField
                fullWidth
                label="Name of Game"
                name="name"
                value={gameDetails.name}
                onChange={handleChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                value={gameDetails.tags}
                onChange={handleTagsChange}
                options={allTags.map((tag) => tag.name)}
                freeSolo
                renderInput={(params) => <TextField {...params} label="Tags" />}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Scores</Typography>
            </Grid>
            {[
              "gameplay",
              "graphics",
              "sound_design",
              "storyline",
              "replayability",
              "multiplayer",
              "learning_ease",
            ].map((item, index) => (
              <Grid key={item} item xs={4}>
                <TextField
                  label={`${
                    item.charAt(0).toUpperCase() + item.slice(1)
                  } Score`}
                  name={item}
                  type="number"
                  value={gameDetails[item]}
                  onChange={handleChange}
                />
              </Grid>
            ))}
            <Grid item xs={8}>
              <TextField
                disabled
                label="Total Score"
                value={totalScore}
                InputProps={{ readOnly: true }}
                variant="filled"
                sx={getFlameIntensityStyle(totalScore)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notes"
                name="notes"
                multiline
                rows={4}
                value={gameDetails.notes}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" color="primary" variant="contained">
                {initialGameData ? "Update Game" : "Add Game"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
}

export default GameForm;
