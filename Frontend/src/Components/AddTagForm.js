import React, { useState } from "react";
import { TextField, Button } from "@mui/material";

function AddTagForm() {
  const [tagName, setTagName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add API call to submit new tag
    console.log("Submitting new tag:", tagName);
    setTagName(""); // Clear form after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Tag Name"
        variant="outlined"
        value={tagName}
        onChange={(e) => setTagName(e.target.value)}
        required
      />
      <Button type="submit" color="primary" variant="contained">
        Add Tag
      </Button>
    </form>
  );
}

export default AddTagForm;
