import React, { useState } from "react";
import axios from "axios";
import { Container, TextField, Button, Typography, Grid, Paper } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const EditQuestion = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(location.state?.question || {});

  const handleChange = (e) => {
    setQuestion({ ...question, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/questions/update/${question._id}`, question);
      alert("✅ Question updated successfully!");
      navigate("/view-questions");
    } catch (error) {
      console.error("❌ Error updating question:", error);
      alert("Failed to update question.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        ✏️ Edit Question
      </Typography>
      <Paper sx={{ padding: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField fullWidth label="Question Text" name="text" value={question.text} onChange={handleChange} required />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Marks" name="marks" type="number" value={question.marks} onChange={handleChange} required />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Module" name="module" type="number" value={question.module} onChange={handleChange} required />
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth label="CO" name="CO" value={question.CO} onChange={handleChange} required />
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth label="PO" name="PO" value={question.PO} onChange={handleChange} required />
            </Grid>
            <Grid item xs={4}>
              <TextField fullWidth label="BL" name="BL" value={question.BL} onChange={handleChange} required />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth>
                ✅ Save Changes
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default EditQuestion;
