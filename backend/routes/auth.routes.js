import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { validate } from "../middlewares/validate.middleware.js";
import { registerUser, loginUser } from "../controllers/auth.controller.js";
import { registerSchema, loginSchema } from "../validations/auth.validation.js";

const router = Router();

router.post("/register", validate(registerSchema), asyncHandler(registerUser));
router.post("/login", validate(loginSchema), asyncHandler(loginUser));

export default router;
