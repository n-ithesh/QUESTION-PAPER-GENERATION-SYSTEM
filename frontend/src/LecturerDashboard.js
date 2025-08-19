import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, Grid, Card, CardContent, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LecturerDashboard = () => {
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await axios.get("http://localhost:5000/subjects");
        setSubjects(response.data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };
    fetchSubjects();
  }, []);

  return (
    <Box sx={styles.dashboardContainer}>
      <Button
        variant="contained"
        sx={styles.logoutButtonTop}
        onClick={() => navigate("/")}
      >
        🚪 Logout
      </Button>
      <Container maxWidth="md" sx={styles.container}>
        <Typography variant="h4" align="center" gutterBottom sx={styles.title}>
          Lecturer Dashboard
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {subjects.length > 0 ? (
            subjects.map((subject) => (
              <Grid item xs={12} sm={6} key={subject._id}>
                <Card sx={styles.card}>
                  <CardContent sx={styles.cardContent}>
                    <Typography variant="h6" align="center" sx={styles.subjectText}>
                      {subject.subjectName} ({subject.subjectCode})
                    </Typography>
                  </CardContent>
                  <Button
                    variant="contained"
                    sx={styles.buttonPrimary}
                    onClick={() =>
                      navigate(
                        `/add-question?subjectId=${subject._id}&subjectName=${encodeURIComponent(subject.subjectName)}&subjectCode=${subject.subjectCode}`
                      )
                    }
                  >
                    ➕ Add Question
                  </Button>
                  <Button
                    variant="contained"
                    sx={styles.buttonSecondary}
                    onClick={() =>
                      navigate(
                        `/generate-question-paper?subjectId=${subject._id}&subjectName=${encodeURIComponent(subject.subjectName)}&subjectCode=${subject.subjectCode}`
                      )
                    }
                  >
                    🔄 Generate QP
                  </Button>
                  <Button
                    variant="contained"
                    sx={styles.buttonView}
                    onClick={() =>
                      navigate(
                        `/view-questions?subjectId=${subject._id}&subjectName=${encodeURIComponent(subject.subjectName)}&subjectCode=${subject.subjectCode}`
                      )
                    }
                  >
                    📜 View Questions
                  </Button>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="body1" align="center" sx={styles.noSubjects}>
              No subjects available. Please add subjects first.
            </Typography>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

// 🎨 Custom Styles
const styles = {
  dashboardContainer: {
    minHeight: "100vh",
    background: "linear-gradient(to right, #1e3c72, #2a5298)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
    position: "relative",
  },
  container: {
    backgroundColor: "white",
    padding: 5,
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
    textAlign: "center",
    position: "relative",
  },
  title: {
    fontWeight: "bold",
    color: "#ffffff",
    letterSpacing: "1px",
    background: "#3f51b5",
    padding: "10px",
    borderRadius: "8px",
  },
  card: {
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
    borderRadius: "16px",
    background: "#F0F4F8",
    transition: "0.3s",
    padding: "15px",
    textAlign: "center",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.25)",
    },
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  subjectText: {
    fontWeight: "bold",
    color: "#333",
  },
  buttonPrimary: {
    marginTop: 2,
    backgroundColor: "#007FFF",
    color: "white",
    "&:hover": { backgroundColor: "#0059B3" },
    width: "100%",
  },
  buttonSecondary: {
    marginTop: 1,
    backgroundColor: "#28A745",
    color: "white",
    "&:hover": { backgroundColor: "#218838" },
    width: "100%",
  },
  buttonView: {
    marginTop: 1,
    backgroundColor: "#FFC107",
    color: "white",
    "&:hover": { backgroundColor: "#E0A800" },
    width: "100%",
  },
  logoutButtonTop: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "#D32F2F",
    color: "white",
    padding: "8px 16px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "bold",
    "&:hover": { backgroundColor: "#B71C1C" },
  },
  noSubjects: {
    width: "100%",
    marginTop: 3,
    color: "#555",
  },
};

export default LecturerDashboard;
