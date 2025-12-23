import pkg from "pg";
import { ApiError } from "../utils/ApiError.js";

const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: String(process.env.DB_PASSWORD),

  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

const connectDB = async () => {
  try {
    const client = await pool.connect();
    console.log("✅ Connected to the database successfully");
    client.release();
  } catch (error) {
    throw new ApiError(500, "Failed to connect to the database");
  }
};

export { pool, connectDB };
