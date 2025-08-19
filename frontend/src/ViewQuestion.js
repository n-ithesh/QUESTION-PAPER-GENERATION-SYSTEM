import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

const ViewQuestion = () => {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  // Fetch questions
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

  // Delete a question
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this question?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/questions/delete/${id}`);
      alert("✅ Question deleted successfully!");
      fetchQuestions(); // Refresh the list
    } catch (error) {
      console.error("❌ Error deleting question:", error);
      alert("Failed to delete the question.");
    }
  };

  return (
    <TableContainer component={Paper} sx={{ marginTop: 3, padding: 2 }}>
      {/* Back Button (No Arrow) */}
      

      <h2>📜 View All Questions</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Subject</b></TableCell>
            <TableCell><b>Module</b></TableCell>
            <TableCell><b>Question</b></TableCell>
            <TableCell><b>Marks</b></TableCell>
            <TableCell><b>CO</b></TableCell>
            <TableCell><b>PO</b></TableCell>
            <TableCell><b>BL</b></TableCell>
            <TableCell><b>Part</b></TableCell>
            <TableCell><b>Actions</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {questions.map((q) => (
            <TableRow key={q._id}>
              <TableCell>{q.subject}</TableCell>
              <TableCell>{q.module}</TableCell>
              <TableCell>{q.text}</TableCell>
              <TableCell>{q.marks}</TableCell>
              <TableCell>{q.CO}</TableCell>
              <TableCell>{q.PO}</TableCell>
              <TableCell>{q.BL}</TableCell>
              <TableCell>{q.part}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(q._id)}
                >
                  <DeleteIcon /> {/* Only delete icon remains */}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

// ✅ Styles
const styles = {
  backButton: {
    backgroundColor: "#1976D2", // Blue color
    color: "white",
    marginBottom: "16px",
    "&:hover": { backgroundColor: "#115293" },
  },
};

export default ViewQuestion;
