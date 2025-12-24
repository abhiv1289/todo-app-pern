import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  createTodoSchema,
  updateTodoSchema,
} from "../validations/todo.validation.js";
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.controller.js";

const router = Router();

router.use(authenticateToken);
router.post("/", validate(createTodoSchema), asyncHandler(createTodo));
router.get("/", asyncHandler(getTodos));
router.put("/:id", validate(updateTodoSchema), asyncHandler(updateTodo));
router.delete("/:id", asyncHandler(deleteTodo));

export default router;
