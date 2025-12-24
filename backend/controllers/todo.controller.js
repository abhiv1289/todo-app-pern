import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  createTodoService,
  getTodosService,
  updateTodoService,
  deleteTodoService,
} from "../services/todo.service.js";

const createTodo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;

  const newTodo = await createTodoService(req.user.id, title, description);

  return res
    .status(201)
    .json(new ApiResponse(201, newTodo, "Todo created successfully"));
});

const getTodos = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const result = await getTodosService(req.user.id, page, limit);

  return res
    .status(200)
    .json(new ApiResponse(200, result, "Todos fetched successfully"));
});

const updateTodo = asyncHandler(async (req, res) => {
  const updatedTodo = await updateTodoService(
    req.user.id,
    req.params.id,
    req.body
  );

  return res
    .status(200)
    .json(new ApiResponse(200, updatedTodo, "Todo updated successfully"));
});

const deleteTodo = asyncHandler(async (req, res) => {
  const deletedTodo = await deleteTodoService(req.user.id, req.params.id);

  return res
    .status(200)
    .json(new ApiResponse(200, deletedTodo, "Todo deleted successfully"));
});

export { createTodo, getTodos, updateTodo, deleteTodo };
