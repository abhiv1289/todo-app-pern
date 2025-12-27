import React from "react";
import { Link } from "react-router-dom";
import { Box, Button, Typography, Container, Grid, Paper } from "@mui/material";

const Homepage = () => {
  return (
    <>
      {/* 🌟 HERO SECTION */}
      <Box
        sx={{
          minHeight: { xs: "70vh", md: "80vh" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          px: { xs: 2, sm: 4 },
          background: "linear-gradient(to right, #4facfe, #00f2fe)",
          color: "white",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            mb: 2,
            fontSize: { xs: "2.2rem", sm: "3rem", md: "3.5rem" },
          }}
        >
          Manage Your Tasks Easily
        </Typography>

        <Typography
          variant="h6"
          sx={{
            mb: 3,
            maxWidth: "650px",
            fontSize: { xs: "1rem", sm: "1.2rem" },
          }}
        >
          Welcome to our Todo App! Stay organized, improve productivity and
          never forget a task again.
        </Typography>

        <Button
          variant="contained"
          color="secondary"
          size="large"
          component={Link}
          to="/signup"
          sx={{
            fontWeight: "bold",
            px: { xs: 3, sm: 4 },
            py: { xs: 1, sm: 1.2 },
            fontSize: { xs: "0.9rem", sm: "1rem" },
          }}
        >
          Get Started
        </Button>
      </Box>

      {/* 💡 FEATURES SECTION */}
      <Container sx={{ mt: { xs: 6, md: 10 }, px: { xs: 1, sm: 4 } }}>
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="bold"
          mb={4}
          sx={{ fontSize: { xs: "1.7rem", md: "2.3rem" } }}
        >
          Why Use Our Todo App?
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper
              sx={{
                p: { xs: 2, sm: 3 },
                textAlign: "center",
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <Typography variant="h6" fontWeight="bold" mb={1}>
                📋 Simple & Clean
              </Typography>
              <Typography fontSize={{ xs: "0.9rem", sm: "1rem" }}>
                Easy-to-use interface that helps you focus on your tasks without
                confusion.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper
              sx={{
                p: { xs: 2, sm: 3 },
                textAlign: "center",
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <Typography variant="h6" fontWeight="bold" mb={1}>
                ⚡ Fast & Efficient
              </Typography>
              <Typography fontSize={{ xs: "0.9rem", sm: "1rem" }}>
                Save and manage tasks instantly with a smooth workflow.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Paper
              sx={{
                p: { xs: 2, sm: 3 },
                textAlign: "center",
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <Typography variant="h6" fontWeight="bold" mb={1}>
                🔐 Secure
              </Typography>
              <Typography fontSize={{ xs: "0.9rem", sm: "1rem" }}>
                Your data is protected and accessible from anywhere.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* 🚀 CALL TO ACTION */}
      <Box
        sx={{
          mt: { xs: 6, md: 10 },
          textAlign: "center",
          py: { xs: 5, md: 7 },
          backgroundColor: "#f8f9fa",
          px: 2,
        }}
      >
        <Typography
          variant="h4"
          mb={2}
          fontWeight="bold"
          sx={{ fontSize: { xs: "1.6rem", sm: "2.2rem" } }}
        >
          Ready to get started?
        </Typography>
        <Typography mb={3} fontSize={{ xs: "0.95rem", sm: "1.1rem" }}>
          Join us today and become more productive!
        </Typography>
        <Button
          variant="contained"
          size="large"
          component={Link}
          to="/login"
          sx={{
            fontWeight: "bold",
            px: { xs: 3, sm: 4 },
            py: { xs: 1, sm: 1.2 },
          }}
        >
          Login to Continue
        </Button>
      </Box>
    </>
  );
};

export default Homepage;
