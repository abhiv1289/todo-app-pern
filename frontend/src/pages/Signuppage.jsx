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

const Loginpage = () => {
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
        minHeight: "80vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "100%",
          borderRadius: 3,
        }}
      >
        <Typography variant="h4" textAlign="center" fontWeight="bold" mb={3}>
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
                    {
                      withCredentials: true,
                    }
                  );
                  console.log("Signup Successful:", response.data);
                  resetForm();
                  loginUser(response.data.data.user);
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
              {/* EMAIL INPUT */}
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
              />

              {/* PASSWORD INPUT */}
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
              />

              {/* SUBMIT BUTTON */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 3, py: 1.2, fontWeight: "bold" }}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </Button>
            </form>
          )}
        </Formik>
        <div>
          <span
            style={{ marginTop: "10px", display: "block", textAlign: "center" }}
          >
            Already have an account?{" "}
            <Link to="/login">
              <span style={{ color: "blue", cursor: "pointer" }}>Login</span>
            </Link>
          </span>
        </div>
      </Paper>
    </Container>
  );
};

export default Loginpage;
