import React from "react";
import { Formik } from "formik";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import { Link } from "react-router";

const Loginpage = () => {
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
          Login
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
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2)); // replace later with API request
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
                Login
              </Button>
            </form>
          )}
        </Formik>
        <div>
          <span
            style={{ marginTop: "10px", display: "block", textAlign: "center" }}
          >
            Don't have an account?{" "}
            <Link to="/signup">
              <span style={{ color: "blue", cursor: "pointer" }}>Sign up</span>
            </Link>
          </span>
        </div>
      </Paper>
    </Container>
  );
};

export default Loginpage;
