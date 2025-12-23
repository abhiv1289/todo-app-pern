import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";

import { registerUser, loginUser } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", asyncHandler(registerUser));
router.post("/login", asyncHandler(loginUser));

export default router;
