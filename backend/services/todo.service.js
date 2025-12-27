import { pool } from "../config/db.js";
import { ApiError } from "../utils/ApiError.js";

const createTodoService = async (userId, title, description) => {
  if (!title) {
    throw new ApiError(400, "Title is required");
  }

  const result = await pool.query(
    `INSERT INTO todos (user_id, title, description)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [userId, title, description]
  );

  return result.rows[0];
};

const getTodosService = async (userId, page, limit) => {
  const offset = (page - 1) * limit;

  const countResult = await pool.query(
    "SELECT COUNT(*) FROM todos WHERE user_id = $1",
    [userId]
  );

  const totalTodos = Number(countResult.rows[0].count);
  const totalPages = Math.ceil(totalTodos / limit);

  const todosResult = await pool.query(
    `SELECT *
     FROM todos
     WHERE user_id = $1
     ORDER BY created_at DESC
     LIMIT $2 OFFSET $3`,
    [userId, limit, offset]
  );

  return {
    todos: todosResult.rows,
    pagination: {
      totalTodos,
      totalPages,
      currentPage: page,
      limit,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };
};

const updateTodoService = async (userId, todoId, updates) => {
  const { title, description, is_completed } = updates;

  const result = await pool.query(
    `UPDATE todos
     SET title = COALESCE($1, title),
         description = COALESCE($2, description),
         is_completed = COALESCE($3, is_completed),
         updated_at = NOW()
     WHERE id = $4 AND user_id = $5
     RETURNING *`,
    [title, description, is_completed, todoId, userId]
  );

  if (!result.rows.length) {
    throw new ApiError(404, "Todo not found");
  }

  return result.rows[0];
};

const deleteTodoService = async (userId, todoId) => {
  const result = await pool.query(
    `DELETE FROM todos
     WHERE id = $1 AND user_id = $2
     RETURNING *`,
    [todoId, userId]
  );

  if (!result.rows.length) {
    throw new ApiError(404, "Todo not found");
  }

  return result.rows[0];
};

const deleteAllTodosService = async (userId) => {
  const res = await pool.query(
    `DELETE FROM todos
     WHERE user_id = $1`,
    [userId]
  );
  return res.rowCount;
};

export {
  createTodoService,
  getTodosService,
  updateTodoService,
  deleteTodoService,
  deleteAllTodosService,
};
