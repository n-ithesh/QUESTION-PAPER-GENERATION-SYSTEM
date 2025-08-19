import React, { useState } from "react";
import { Container, TextField, Button, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(""); // Reset error message

    try {
      const response = await axios.post("http://localhost:5000/login", { username, password });

      if (response.data.success) {
        if (response.data.role === "admin") {
          navigate("/admin");
        } else if (response.data.role === "lecturer") {
          navigate("/lecturer");
        }
      } else {
        setError(response.data.message || "Invalid username or password!");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <Container maxWidth="xs" sx={{ textAlign: "center", marginTop: "100px" }}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField label="Username" fullWidth margin="normal" value={username} onChange={(e) => setUsername(e.target.value)} />
      <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button variant="contained" color="primary" fullWidth onClick={handleLogin} sx={{ marginTop: "20px" }}>Login</Button>
    </Container>
  );
};

export default Login;
