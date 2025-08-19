import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import ArticleIcon from "@mui/icons-material/Article";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const ViewSubject = () => {
  const [subjects, setSubjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await axios.get("http://localhost:5000/subjects");
      setSubjects(response.data);
    } catch (error) {
      console.error("Error fetching subjects", error);
    }
  };

  const handleEdit = (subject) => {
    navigate("/admin/edit-subject", { state: { subject } });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this subject?")) return;

    try {
      await axios.delete(`http://localhost:5000/delete-subject/${id}`);
      setSubjects(subjects.filter((subject) => subject._id !== id));
    } catch (error) {
      console.error("Error deleting subject", error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 5 }}>
      <Button
        variant="contained"
        startIcon={<ArrowBackIcon />}
        sx={styles.backButton}
        onClick={() => navigate(-1)}
      >
        Back
      </Button>
      <Typography variant="h4" align="center" gutterBottom>
        Subjects List
      </Typography>
      <Grid container direction="column" spacing={3}>
        {subjects.map((subject) => (
          <Grid item xs={12} key={subject._id}>
            <Card
              sx={{
                boxShadow: 3,
                transition: "0.3s",
                width: "100%",
                "&:hover": { transform: "scale(1.02)" },
                padding: "10px",
              }}
            >
              <CardContent>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box display="flex" alignItems="center">
                    <SchoolIcon color="primary" sx={{ marginRight: 1 }} />
                    <Typography variant="h6">
                      {subject.subjectName} ({subject.subjectCode})
                    </Typography>
                  </Box>
                  <Box>
                    {subject.syllabusPath && (
                      <Button
                        variant="outlined"
                        size="small"
                        color="secondary"
                        startIcon={<ArticleIcon />}
                        href={`http://localhost:5000/${subject.syllabusPath}`} // ✅ Fixed
                        target="_blank"
                        sx={{ textTransform: "none", marginRight: 1 }}
                      >
                        View Syllabus
                      </Button>
                    )}
                    <IconButton color="primary" onClick={() => handleEdit(subject)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(subject._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Typography variant="body2" color="textSecondary">
                  🎓 Credits: {subject.credit}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

const styles = {
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    backgroundColor: "#FFB74D",
    color: "white",
    padding: "10px 20px",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    "&:hover": { backgroundColor: "#FFA726" },
  },
};

export default ViewSubject;
