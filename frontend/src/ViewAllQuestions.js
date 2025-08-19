import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const ViewAllQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/questions");
      setQuestions(response.data);
    } catch (error) {
      console.error("❌ Error fetching questions:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        await axios.delete(`http://localhost:5000/api/questions/delete/${id}`);
        alert("✅ Question deleted successfully!");
        fetchQuestions();
      } catch (error) {
        console.error("❌ Error deleting question:", error);
      }
    }
  };

  return (
    <Container>
      <IconButton onClick={() => navigate("/lecturer-dashboard")}>
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h4" align="center" gutterBottom>
        View All Questions
      </Typography>
      <TableContainer component={Paper} style={{ marginTop: 20, borderRadius: 10, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
        <Table>
          <TableHead style={{ backgroundColor: "#1976d2", color: "white" }}>
            <TableRow>
              <TableCell style={{ color: "white" }}><b>Subject</b></TableCell>
              <TableCell style={{ color: "white" }}><b>Module</b></TableCell>
              <TableCell style={{ color: "white" }}><b>Question</b></TableCell>
              <TableCell style={{ color: "white" }}><b>Marks</b></TableCell>
              <TableCell style={{ color: "white" }}><b>CO</b></TableCell>
              <TableCell style={{ color: "white" }}><b>PO</b></TableCell>
              <TableCell style={{ color: "white" }}><b>BL</b></TableCell>
              <TableCell style={{ color: "white" }}><b>Part</b></TableCell>
              <TableCell style={{ color: "white" }}><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questions.map((q) => (
              <TableRow key={q._id}>
                <TableCell>{q.subject.subjectName}</TableCell>
                <TableCell>{q.module}</TableCell>
                <TableCell>{q.text}</TableCell>
                <TableCell>{q.marks}</TableCell>
                <TableCell>{q.CO}</TableCell>
                <TableCell>{q.PO}</TableCell>
                <TableCell>{q.BL}</TableCell>
                <TableCell>{q.part}</TableCell>
                <TableCell>
                  <IconButton color="secondary" onClick={() => handleDelete(q._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default ViewAllQuestions;