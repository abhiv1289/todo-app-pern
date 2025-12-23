import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from "../controllers/todo.controller.js";

const router = Router();

router.use(authenticateToken);
router.post("/", asyncHandler(createTodo));
router.get("/", asyncHandler(getTodos));
router.put("/:id", asyncHandler(updateTodo));
router.delete("/:id", asyncHandler(deleteTodo));

export default router;
