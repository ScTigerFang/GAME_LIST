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

  // Initialize form state when initialGameData changes
  useEffect(() => {
    if (initialGameData) {
      setGameDetails({
        name: initialGameData.name,
        gameplay: initialGameData.gameplay || "",
        graphics: initialGameData.graphics || "",
        sound_design: initialGameData.sound_design || "",
        storyline: initialGameData.storyline || "",
        replayability: initialGameData.replayability || "",
        multiplayer: initialGameData.multiplayer || "",
        learning_ease: initialGameData.learning_ease || "",
        notes: initialGameData.notes || "",
        tags: Array.isArray(initialGameData.tags)
          ? initialGameData.tags
          : initialGameData.tags.split(", "), // Split tags by comma if not already an array
      });
    } else {
      setGameDetails(initialState);
    }
  }, [initialGameData, open]);

  const handleChange = (e) => {
    setGameDetails({ ...gameDetails, [e.target.name]: e.target.value });
  };

  const handleTagsChange = (event, newValue) => {
    setGameDetails({ ...gameDetails, tags: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(gameDetails);
    onClose();
  };

  const isEditing = !!initialGameData;

  // Calculate total score
  const totalScore = [
    "gameplay",
    "graphics",
    "sound_design",
    "storyline",
    "replayability",
    "multiplayer",
    "learning_ease",
  ].reduce((sum, key) => sum + Number(gameDetails[key] || 0), 0);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800, // Increased width for better layout
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          overflowY: "auto",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Row 1: Title and Name */}
            <Grid item xs={12}>
              <Typography variant="h6" component="h2">
                {isEditing ? "Edit Game" : "Add New Game"}
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

            {/* Row 2: Tags */}
            <Grid item xs={12}>
              <Autocomplete
                multiple
                value={gameDetails.tags}
                onChange={(event, newValue) => {
                  setGameDetails({ ...gameDetails, tags: newValue });
                }}
                options={allTags.map((tag) => tag.name)}
                freeSolo
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" label="Tags" />
                )}
              />
            </Grid>

            {/* Row 3: Subtitle for Scores */}
            <Grid item xs={12}>
              <Typography variant="subtitle1">Scores</Typography>
            </Grid>

            {/* Rows 4-6: Scores */}
            <Grid item xs={4}>
              <TextField
                label="Gameplay Score"
                name="gameplay"
                type="number"
                value={gameDetails.gameplay}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Graphics Score"
                name="graphics"
                type="number"
                value={gameDetails.graphics}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Sound Design Score"
                name="sound_design"
                type="number"
                value={gameDetails.sound_design}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Storyline Score"
                name="storyline"
                type="number"
                value={gameDetails.storyline}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Replayability Score"
                name="replayability"
                type="number"
                value={gameDetails.replayability}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Multiplayer Score"
                name="multiplayer"
                type="number"
                value={gameDetails.multiplayer}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Learning Ease Score"
                name="learning_ease"
                type="number"
                value={gameDetails.learning_ease}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                disabled
                label="Total Score"
                value={totalScore}
                InputProps={{
                  readOnly: true,
                }}
                variant="filled"
              />
            </Grid>

            {/* Row 7: Notes */}
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

            {/* Row 8: Add Game Button */}
            <Grid item xs={12}>
              <Button type="submit" color="primary" variant="contained">
                {isEditing ? "Update Game" : "Add Game"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Modal>
  );
}

export default GameForm;
