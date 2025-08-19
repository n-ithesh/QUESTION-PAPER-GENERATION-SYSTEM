import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography, Grid, MenuItem, Paper, Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const AddQuestion = () => {
  const [question, setQuestion] = useState({
    subject: "",
    module: "",
    text: "",
    marks: "",
    CO: "",
    PO: "",
    BL: "",
    part: "",
  });

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const subjectIdFromURL = queryParams.get("subjectId");
  const subjectNameFromURL = queryParams.get("subjectName");

  useEffect(() => {
    if (subjectIdFromURL) {
      setQuestion((prev) => ({ ...prev, subject: subjectIdFromURL }));
    }
  }, [subjectIdFromURL]);

  const handleChange = (e) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/questions/add", question);
      alert(response.data.message);
      setQuestion({
        subject: subjectIdFromURL,
        module: "",
        text: "",
        marks: "",
        CO: "",
        PO: "",
        BL: "",
        part: "",
      });
    } catch (error) {
      alert("❌ Failed to add question. Please try again.");
      console.error(error);
    }
  };

  return (
    <Box sx={styles.pageContainer}>
      <Button variant="contained" sx={styles.backButton} onClick={() => navigate("/lecturer-dashboard")}>
        🔙 Back to Dashboard
      </Button>

      <Container maxWidth="sm" sx={styles.glassContainer}>
        <Typography variant="h4" align="center" gutterBottom sx={styles.title}>
          Add Question
        </Typography>

        <Paper sx={{ padding: 3, boxShadow: 3, backgroundColor: "transparent" }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField fullWidth label="Selected Subject" value={subjectNameFromURL || ""} disabled sx={styles.input} />
              </Grid>

              <Grid item xs={6}>
                <TextField fullWidth label="Module" name="module" type="number" value={question.module} onChange={handleChange} required sx={styles.input} />
              </Grid>

              <Grid item xs={12}>
                <TextField fullWidth label="Enter Question" name="text" multiline rows={3} value={question.text} onChange={handleChange} required sx={styles.input} />
              </Grid>

              <Grid item xs={6}>
                <TextField select fullWidth label="Marks" name="marks" value={question.marks} onChange={handleChange} required sx={styles.input}>
                  {[2, 8, 10].map((mark) => (
                    <MenuItem key={mark} value={mark}>
                      {mark} Marks
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={6}>
                <TextField select fullWidth label="Part" name="part" value={question.part} onChange={handleChange} required sx={styles.input}>
                  <MenuItem value="A">Part A</MenuItem>
                  <MenuItem value="B">Part B</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={4}>
                <TextField fullWidth label="CO" name="CO" value={question.CO} onChange={handleChange} required sx={styles.input} />
              </Grid>
              <Grid item xs={4}>
                <TextField fullWidth label="PO" name="PO" value={question.PO} onChange={handleChange} required sx={styles.input} />
              </Grid>
              <Grid item xs={4}>
                <TextField fullWidth label="Bloom's Level" name="BL" value={question.BL} onChange={handleChange} required sx={styles.input} />
              </Grid>

              <Grid item xs={12}>
                <Button type="submit" variant="contained" fullWidth sx={styles.submitButton}>
                  ✅ Save Question
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

// Styles object
const styles = {
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 3,
  },
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 2,
  },
  glassContainer: {
    backdropFilter: "blur(10px)",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 4,
    borderRadius: 2,
  },
  title: {
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    backgroundColor: "white",
    borderRadius: 1,
  },
  submitButton: {
    marginTop: 2,
    backgroundColor: "#4CAF50",
    "&:hover": {
      backgroundColor: "#45a049",
    },
  },
};

export default AddQuestion;
