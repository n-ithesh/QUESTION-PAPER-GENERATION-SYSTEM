import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  InputLabel,
  Box,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Subject = () => {
  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [credit, setCredit] = useState("");
  const [syllabus, setSyllabus] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setSyllabus(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subjectName || !subjectCode || !credit || !syllabus) {
      alert("❌ Please fill all fields and upload the syllabus!");
      return;
    }

    const formData = new FormData();
    formData.append("subjectName", subjectName);
    formData.append("subjectCode", subjectCode);
    formData.append("credit", credit);
    formData.append("syllabus", syllabus);

    try {
      const response = await axios.post("http://localhost:5000/add-subject", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(response.data.message);

      // Reset form after successful submission
      setSubjectName("");
      setSubjectCode("");
      setCredit("");
      setSyllabus(null);
      if (fileInputRef.current) fileInputRef.current.value = "";

      navigate("/admin");
    } catch (error) {
      console.error("❌ Error adding subject:", error);
      alert(error.response?.data?.message || "❌ Failed to add subject.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #e0f7fa, #80deea)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 3,
        position: "relative",
      }}
    >
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate("/admin")}
        sx={{
          position: "absolute",
          top: 20,
          left: 20,
          color: "#ffffff",
          backgroundColor: "#0277bd",
          "&:hover": { backgroundColor: "#01579b" },
          padding: "6px 12px",
          borderRadius: 2,
        }}
      >
        Back
      </Button>

      {/* ✅ FIXED BACKGROUND IMAGE ISSUE */}
      <Box
        sx={{
          width: "100%",
          height: 140,
          backgroundImage: "url('https://source.unsplash.com/1600x900/?education,learning')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "#01579b",
            fontWeight: "bold",
            textShadow: "1px 1px 3px rgba(0,0,0,0.3)",
          }}
        >
          Add a New Subject
        </Typography>
      </Box>

      <Container maxWidth="sm" sx={{ marginTop: -2 }}>
        <Paper
          elevation={5}
          sx={{
            padding: 4,
            borderRadius: 3,
            backgroundColor: "#ffffff",
            color: "#000000",
            boxShadow: 4,
          }}
        >
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Subject Name"
                  variant="outlined"
                  fullWidth
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Subject Code"
                  variant="outlined"
                  fullWidth
                  value={subjectCode}
                  onChange={(e) => setSubjectCode(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Credit"
                  type="number"
                  variant="outlined"
                  fullWidth
                  value={credit}
                  onChange={(e) => setCredit(e.target.value)}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel sx={{ fontWeight: "bold", color: "#0277bd" }}>
                  Upload Syllabus (PDF)
                </InputLabel>
                <Box display="flex" alignItems="center">
                  <Button
                    variant="contained"
                    component="label"
                    startIcon={<CloudUploadIcon />}
                    sx={{
                      backgroundColor: "#81d4fa",
                      color: "black",
                      "&:hover": { backgroundColor: "#4fc3f7" },
                      borderRadius: 2,
                    }}
                  >
                    Choose File
                    <input type="file" hidden ref={fileInputRef} onChange={handleFileChange} />
                  </Button>
                  {syllabus && (
                    <Typography sx={{ marginLeft: 2, fontWeight: "bold", color: "#01579b" }}>
                      {syllabus.name}
                    </Typography>
                  )}
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{
                    backgroundColor: "#0277bd",
                    color: "white",
                    fontWeight: "bold",
                    borderRadius: 3,
                    "&:hover": { backgroundColor: "#01579b" },
                  }}
                >
                  ✅ Save Subject
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Subject;
