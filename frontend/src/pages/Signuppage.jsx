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
import { Link, useNavigate } from "react-router";
import { axiosInstance } from "../utility/axios";
import { useUser } from "../context/UserContext";

const SignupPage = () => {
  const [loading, setLoading] = useState(false);
  const { loginUser } = useUser();
  const navigate = useNavigate();

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
          Sign Up
        </Typography>

        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            if (!values.password) {
              errors.password = "Required";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            setTimeout(() => {
              const handleOnSubmit = async () => {
                setLoading(true);
                try {
                  const response = await axiosInstance.post(
                    "/v1/auth/register",
                    values,
                    { withCredentials: true }
                  );

                  loginUser(response.data.data.user);
                  resetForm();
                  navigate("/");
                } catch (error) {
                  console.error(
                    "Signup error:",
                    error.response?.data?.message || error.message
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
              <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                margin="normal"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={Boolean(errors.email && touched.email)}
                helperText={errors.email && touched.email && errors.email}
                size="medium"
              />

              <TextField
                label="Password"
                name="password"
                type="password"
                fullWidth
                margin="normal"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                error={Boolean(errors.password && touched.password)}
                helperText={
                  errors.password && touched.password && errors.password
                }
                size="medium"
              />

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
                {loading ? "Signing Up..." : "Sign Up"}
              </Button>
            </form>
          )}
        </Formik>

        <Box textAlign="center" mt={2}>
          <Typography fontSize={{ xs: "0.9rem", sm: "1rem" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#1976d2", fontWeight: "bold" }}>
              Login
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignupPage;
