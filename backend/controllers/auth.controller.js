import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { pool } from "../config/db.js";

const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const existingUser = await pool.query(
    "SELECT id FROM users WHERE email = $1",
    [email]
  );

  if (existingUser.rows.length > 0) {
    throw new ApiError(409, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = await pool.query(
    `INSERT INTO users (email,password_hash) VALUES ($1, $2) RETURNING id, email`,
    [email, hashedPassword]
  );

  return res
    .status(201)
    .json(
      new ApiResponse(201, newUser.rows[0], "User registered successfully")
    );
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const userQuery = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  const user = userQuery.rows[0];

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);

  if (!isMatch) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, { token }, "Login successful"));
});

export { registerUser, loginUser };
