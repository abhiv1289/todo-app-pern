import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { pool } from "../config/db.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTodo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    throw new ApiError(400, "Title is required");
  }

  const newTodo = await pool.query(
    `INSERT INTO todoes (user_id,title,description) VALUES ($1, $2, $3) RETURNING *`,
    [req.user.id, title, description]
  );

  return res
    .status(201)
    .json(new ApiResponse(201, newTodo.rows[0], "Todo created successfully"));
});

const getTodos = asyncHandler(async (req, res) => {
  const todos = await pool.query(
    `SELECT * FROM todoes WHERE user_id = $1 ORDER BY created_at DESC`,
    [req.user.id]
  );

  return res
    .status(200)
    .json(new ApiResponse(200, todos.rows, "Todos fetched successfully"));
});

const updateTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, is_completed } = req.body;

  const updated = await pool.query(
    `UPDATE todos
        SET title = COALESCE($1,title),
            is_completed = COALESCE($2,is_completed),
            updated_at = NOW()
        WHERE id = $3 AND user_id = $4
        RETURNING *`,
    [title, is_completed, id, req.user.id]
  );

  if (updated.rows.length === 0) {
    throw new ApiError(404, "Todo not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updated.rows[0], "Todo updated successfully"));
});

const deleteTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deleted = await pool.query(
    "DELETE FROM todos WHERE id = $1 AND user_id = $2 RETURNING *",
    [id, req.user.id]
  );
  if (deleted.rows.length === 0) {
    throw new ApiError(404, "Todo not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, deleted.rows[0], "Todo deleted successfully"));
});
