import React, { useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import axios from "axios";

const generateRandomCredentials = () => {
  const username = `lec${Math.floor(1000 + Math.random() * 9000)}`;
  const password = Math.random().toString(36).slice(-8);
  return { username, password };
};

const AddLecturer = () => {
  const [name, setName] = useState("");
  const [credentials, setCredentials] = useState(null);

  const handleSubmit = async () => {
    const { username, password } = generateRandomCredentials();
    setCredentials({ username, password });

    try {
      await axios.post("http://localhost:5000/add-lecturer", { name, username, password });
      alert("Lecturer added successfully!");
    } catch (error) {
      console.error("Error adding lecturer", error);
      alert("Failed to add lecturer.");
    }
  };

  return (
    <Container maxWidth="xs" sx={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h5" gutterBottom>
        Add Lecturer
      </Typography>
      <TextField
        label="Lecturer Name"
        fullWidth
        margin="normal"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
        Add Lecturer
      </Button>
      {credentials && (
        <div style={{ marginTop: "20px" }}>
          <Typography variant="subtitle1">Generated Username: {credentials.username}</Typography>
          <Typography variant="subtitle1">Generated Password: {credentials.password}</Typography>
        </div>
      )}
    </Container>
  );
};

export default AddLecturer;
