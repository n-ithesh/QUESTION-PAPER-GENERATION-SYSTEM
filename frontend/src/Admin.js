import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { 
  Container, Typography, Grid, Card, CardActionArea, CardContent, Box, Button 
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ListIcon from "@mui/icons-material/List";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const Admin = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, rgb(42, 161, 191), #2a5298)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 4,
        position: "relative",
      }}
    >
      {/* Logout Button */}
      <Button 
        variant="contained"
        startIcon={<ExitToAppIcon />}
        sx={styles.logoutButton}
        onClick={() => navigate("/")}
      >
        Logout
      </Button>

      <Container 
        maxWidth="md"
        sx={{
          backgroundColor: "white",
          padding: 4,
          borderRadius: 3,
          boxShadow: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#333" }}>
          Question Paper Generation System
        </Typography>

        <Grid container spacing={3} justifyContent="center" sx={{ marginTop: 2 }}>
          {/* Add Subject Card */}
          <Grid item xs={12} sm={4}>
            <Card sx={styles.card}>
              <CardActionArea component={Link} to="/admin/add-subject">
                <CardContent sx={styles.cardContent}>
                  <AddCircleOutlineIcon sx={styles.icon} />
                  <Typography variant="h6">Add Subject</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          {/* View Questions Card */}
          <Grid item xs={12} sm={4}>
            <Card sx={styles.card}>
              <CardActionArea component={Link} to="/admin/view-question">
                <CardContent sx={styles.cardContent}>
                  <VisibilityIcon sx={styles.icon} />
                  <Typography variant="h6">View Questions</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          {/* View Subjects Card */}
          <Grid item xs={12} sm={4}>
            <Card sx={styles.card}>
              <CardActionArea component={Link} to="/admin/view-subject">
                <CardContent sx={styles.cardContent}>
                  <ListIcon sx={styles.icon} />
                  <Typography variant="h6">View Subjects</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>

        {/* Renders child pages inside this layout */}
        <Box sx={{ marginTop: 3 }}>
          <Outlet />
        </Box>
      </Container>
    </Box>
  );
};

// 🔥 Custom Styles
const styles = {
  card: {
    boxShadow: 5,
    borderRadius: 2,
    transition: "0.3s",
    "&:hover": { transform: "scale(1.05)", boxShadow: 8 },
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  icon: {
    fontSize: 50,
    color: "#1565C0",
    marginBottom: 1,
  },
  logoutButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "#D32F2F",
    color: "white",
    padding: "10px 20px",
    borderRadius: "10px",
    fontSize: "16px",
    fontWeight: "bold",
    "&:hover": { backgroundColor: "#B71C1C" },
  },
};

export default Admin;