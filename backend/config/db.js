import pkg from "pg";
import { ApiError } from "../utils/ApiError.js";

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
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
