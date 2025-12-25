import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { pool } from "../config/db.js";
import {
  createUserService,
  loginUserService,
} from "../services/auth.service.js";

const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const newUser = await createUserService(email, password);
  return res
    .status(201)
    .json(new ApiResponse(201, newUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const { user, token } = await loginUserService(email, password);

  return res
    .status(200)
    .json(new ApiResponse(200, { user, token }, "Login successful"));
});

export { registerUser, loginUser };
