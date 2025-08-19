import React from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate, useLocation } from "react-router-dom";
import { Container, Typography, Grid, Card, CardActionArea, CardContent, Box, TextField, Button } from "@mui/material";
import Admin from "./Admin";
import Subject from "./Subject";
import LecturerDashboard from "./LecturerDashboard";
import AddQuestion from "./AddQuestion";
import GenerateQuestionPaper from "./GenerateQuestionPaper";
import ViewAllQuestions from "./ViewAllQuestions";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SchoolIcon from "@mui/icons-material/School";
import EditSubject from "./EditSubject";
import ViewSubject from "./ViewSubject"
import EditQuestion from "./EditQuestion";

const Home = () => {
  return (
    <Box sx={styles.pageContainer}>
      <Container maxWidth="sm" sx={styles.glassContainer}>
        <Typography variant="h4" gutterBottom sx={styles.title}>Select Your Role</Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <Card sx={styles.card}>
              <CardActionArea component={Link} to="/login?role=admin">
                <CardContent sx={styles.cardContent}>
                  <AdminPanelSettingsIcon sx={styles.iconAdmin} />
                  <Typography variant="h5" sx={styles.cardText}>Admin</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card sx={styles.card}>
              <CardActionArea component={Link} to="/login?role=lecturer">
                <CardContent sx={styles.cardContent}>
                  <SchoolIcon sx={styles.iconLecturer} />
                  <Typography variant="h5" sx={styles.cardText}>Lecturer</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const role = params.get("role");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const credentials = {
    admin: { email: "admin@gmail.com", password: "admin123" },
    lecturer: { email: "lecturer@gmail.com", password: "lecturer123" },
  };

  const handleLogin = () => {
    if (credentials[role] && email === credentials[role].email && password === credentials[role].password) {
      navigate(role === "admin" ? "/admin" : "/lecturer-dashboard");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <Box sx={styles.pageContainerLogin}>
      <Container maxWidth="xs" sx={styles.glassContainerLogin}>
        <Typography variant="h5" sx={styles.title}>{role === "admin" ? "Admin Login" : "Lecturer Login"}</Typography>
        <TextField fullWidth label="Email" variant="outlined" margin="dense" onChange={(e) => setEmail(e.target.value)} sx={styles.input} />
        <TextField fullWidth label="Password" type="password" variant="outlined" margin="dense" onChange={(e) => setPassword(e.target.value)} sx={styles.input} />
        <Button variant="contained" fullWidth sx={styles.button} onClick={handleLogin}>Login</Button>
      </Container>
    </Box>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/add-subject" element={<Subject />} />
        <Route path="/admin/view-subject" element={<ViewSubject />} />
        <Route path="/admin/edit-subject" element={<EditSubject />} />
        <Route path="/lecturer-dashboard" element={<LecturerDashboard />} />
        <Route path="/add-question" element={<AddQuestion />} />
        <Route path="/view-questions" element={<ViewAllQuestions />} />
        <Route path="/generate-question-paper" element={<GenerateQuestionPaper />} />
        <Route path="/edit-question/:id" element={<EditQuestion />} />
      </Routes>
    </Router>
  );
};

const styles = {
  pageContainer: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(to right, #1e3c72, #2a5298)",
  },
  pageContainerLogin: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(to right,rgba(81, 38, 226, 0.76),rgba(231, 164, 193, 0.83))",
  },
  glassContainer: {
    textAlign: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    padding: 5,
    borderRadius: 5,
    backdropFilter: "blur(10px)",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.37)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  },
  glassContainerLogin: {
    textAlign: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    padding: 4,
    borderRadius: 3,
    backdropFilter: "blur(10px)",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
  },
  title: {
    fontWeight: "bold",
    color: "white",
    letterSpacing: "1px",
    marginBottom: 3,
  },
  card: {
    transition: "0.3s",
    borderRadius: "15px",
    background: "rgba(255, 255, 255, 0.15)",
    backdropFilter: "blur(15px)",
    boxShadow: "0 6px 20px rgba(0, 0, 0, 0.2)",
    '&:hover': { transform: "scale(1.05)", boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)" },
  },
  iconAdmin: { fontSize: 60, color: "#FFD700" },
  iconLecturer: { fontSize: 60, color: "#00C853" },
  cardText: { marginTop: 2, fontWeight: "bold", color: "white" },
  input: { backgroundColor: "white", borderRadius: 1, marginBottom: 2 },
  button: { marginTop: 2, backgroundColor: "rgba(70, 23, 226, 0.76)", color: "white" },
};

export default App;