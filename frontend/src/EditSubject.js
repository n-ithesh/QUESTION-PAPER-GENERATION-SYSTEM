import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, TextField, Button, Typography, Box, Paper } from "@mui/material";

const EditSubject = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { subject } = location.state || {};

  const [formData, setFormData] = useState({
    subjectName: "",
    subjectCode: "",
    credit: "",
  });

  useEffect(() => {
    if (subject) {
      setFormData({
        subjectName: subject.subjectName || "",
        subjectCode: subject.subjectCode || "",
        credit: subject.credit || "",
      });
    } else {
      // Redirect if no subject data is found
      navigate("/admin/view-subject");
    }
  }, [subject, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subject || !subject._id) {
      alert("⚠️ No subject data available.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/update-subject/${subject._id}`,
        formData
      );

      alert(response.data.message || "✅ Subject updated successfully!");
      navigate("/admin/view-subject");
    } catch (error) {
      console.error("❌ Error updating subject:", error);
      alert(error.response?.data?.message || "❌ Failed to update subject.");
    }
  };

  return (
    <Box sx={styles.pageContainer}>
      <Container maxWidth="sm">
        <Paper elevation={6} sx={styles.glassContainer}>
          <Typography variant="h4" align="center" gutterBottom sx={styles.title}>
            ✏️ Edit Subject
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Subject Name"
              name="subjectName"
              value={formData.subjectName}
              onChange={handleChange}
              margin="normal"
              required
              sx={styles.input}
            />
            <TextField
              fullWidth
              label="Subject Code"
              name="subjectCode"
              value={formData.subjectCode}
              onChange={handleChange}
              margin="normal"
              required
              sx={styles.input}
            />
            <TextField
              fullWidth
              label="Credits"
              name="credit"
              type="number"
              value={formData.credit}
              onChange={handleChange}
              margin="normal"
              required
              sx={styles.input}
            />
            <Box mt={3} display="flex" justifyContent="space-between">
              <Button variant="contained" sx={styles.cancelButton} onClick={() => navigate(-1)}>
                ❌ Cancel
              </Button>
              <Button type="submit" variant="contained" sx={styles.saveButton}>
                💾 Save Changes
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

// 🎨 *Custom Styling*
const styles = {
  pageContainer: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(to right, #E3F2FD, #BBDEFB)", // Light Blue Gradient
    padding: 4,
  },
  glassContainer: {
    padding: 5,
    borderRadius: 10,
    backdropFilter: "blur(10px)",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  title: {
    fontWeight: "bold",
    color: "#1976D2",
    letterSpacing: "1px",
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 2,
  },
  cancelButton: {
    backgroundColor: "#FF5252",
    color: "white",
    "&:hover": { backgroundColor: "#D32F2F" },
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    "&:hover": { backgroundColor: "#388E3C" },
  },
};

export default EditSubject;
