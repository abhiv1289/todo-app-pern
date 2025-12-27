import React, { useState } from "react";
import { Formik } from "formik";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../utility/axios.js";
import { useUser } from "../context/UserContext.jsx";

const Loginpage = () => {
  const { loginUser } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "85vh",
        px: { xs: 2, sm: 0 },
      }}
    >
      <Paper
        elevation={4}
        sx={{
          p: { xs: 3, sm: 4 },
          width: "100%",
          borderRadius: 3,
          boxShadow: { xs: 2, sm: 4 },
        }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="bold"
          mb={3}
          sx={{ fontSize: { xs: "1.8rem", sm: "2.2rem" } }}
        >
          Login
        </Typography>

        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) errors.email = "Required";
            else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            )
              errors.email = "Invalid email address";
            if (!values.password) errors.password = "Required";
            return errors;
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setTimeout(() => {
              const handleOnSubmit = async () => {
                setLoading(true);
                try {
                  const response = await axiosInstance.post(
                    "/v1/auth/login",
                    values,
                    { withCredentials: true }
                  );

                  loginUser(response.data.data.user);
                  resetForm();
                  navigate("/");
                } catch (error) {
                  console.error(
                    "Login error:",
                    error.response?.data?.message || error.message
                  );
                  setErrorMessage(
                    error.response?.data?.message ||
                      "An error occurred during login."
                  );
                } finally {
                  setLoading(false);
                }
              };
              handleOnSubmit();
              setSubmitting(false);
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              {/* EMAIL FIELD */}
              <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                margin="normal"
                variant="outlined"
                size="medium"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={Boolean(errors.email && touched.email)}
                helperText={errors.email && touched.email && errors.email}
              />

              {/* PASSWORD FIELD */}
              <TextField
                label="Password"
                name="password"
                type="password"
                fullWidth
                margin="normal"
                variant="outlined"
                size="medium"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                error={Boolean(errors.password && touched.password)}
                helperText={
                  errors.password && touched.password && errors.password
                }
              />

              {/* LOGIN BUTTON */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{
                  mt: 3,
                  py: { xs: 1, sm: 1.2 },
                  fontWeight: "bold",
                  fontSize: { xs: "0.95rem", sm: "1rem" },
                }}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
          )}
        </Formik>
        {errorMessage && (
          <Box mt={2}>
            <Typography color="error" textAlign="center">
              {errorMessage}
            </Typography>
          </Box>
        )}

        {/* SIGNUP LINK */}
        <Box textAlign="center" mt={2}>
          <Typography fontSize={{ xs: "0.9rem", sm: "1rem" }}>
            Don't have an account?{" "}
            <Link to="/signup" style={{ color: "#1976d2", fontWeight: "bold" }}>
              Sign up
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Loginpage;
