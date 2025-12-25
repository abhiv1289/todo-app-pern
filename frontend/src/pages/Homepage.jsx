import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Typography, Container, Grid, Paper } from "@mui/material";

const Homepage = () => {
  return (
    <>
      {/* 🌟 HERO SECTION */}
      <Box
        sx={{
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          px: 2,
          background: "linear-gradient(to right, #4facfe, #00f2fe)",
          color: "white",
        }}
      >
        <Typography variant="h2" sx={{ fontWeight: "bold", mb: 2 }}>
          Manage Your Tasks Easily
        </Typography>
        <Typography variant="h6" sx={{ mb: 3, maxWidth: "600px" }}>
          Welcome to our Todo App! Stay organized, improve productivity and
          never forget a task again.
        </Typography>

        <Button
          variant="contained"
          color="secondary"
          size="large"
          component={Link}
          to="/signup"
          sx={{ fontWeight: "bold", px: 4, py: 1 }}
        >
          Get Started
        </Button>
      </Box>

      {/* 💡 FEATURES SECTION */}
      <Container sx={{ mt: 8 }}>
        <Typography variant="h4" textAlign="center" fontWeight="bold" mb={4}>
          Why Use Our Todo App?
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="h6" fontWeight="bold" mb={1}>
                📋 Simple & Clean
              </Typography>
              <Typography>
                Easy-to-use interface that helps you focus on your tasks without
                confusion.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* 🚀 CALL TO ACTION */}
      <Box
        sx={{ mt: 10, textAlign: "center", py: 6, backgroundColor: "#f8f9fa" }}
      >
        <Typography variant="h4" mb={2} fontWeight="bold">
          Ready to get started?
        </Typography>
        <Typography mb={3}>
          Join us today and become more productive!
        </Typography>
        <Button
          variant="contained"
          size="large"
          component={Link}
          to="/login"
          sx={{ fontWeight: "bold" }}
        >
          Login to Continue
        </Button>
      </Box>
    </>
  );
};

export default Homepage;
