import "./env.js";
import express from "express";
import cors from "cors";

import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import { ApiError } from "./utils/ApiError.js";

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());
//Middlewares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

//Routes
import authRoutes from "./routes/auth.routes.js";
import todoRoutes from "./routes/todo.routes.js";

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/todos", todoRoutes);

// 404 Handler
app.use((req, res, next) => {
  next(new ApiError(404, "Route not found"));
});

//Global Error Handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    statusCode,
    message: err.message || "Internal Server Error",
    errors: err.errors || [],
  });
});

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
  });
