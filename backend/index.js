import express from "express";
import cors from "cors";
import Pool from "./config/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { ApiError } from "./utils/ApiError.js";

const app = express();

dotenv.config();

//Middlewares
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

//Routes
import authRoutes from "./routes/auth.routes.js";
import todoRoutes from "./routes/todo.routes.js";

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/todos", todoRoutes);

//Global Error Handler
app.use((err, req, res, next) => {
  throw new ApiError(err.statusCode || 404, err.message || "Route Not Found");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
