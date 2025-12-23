import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";

export const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError(401, "Unauthorized: No token provided");
  }

  const token = authHeader?.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { id: decoded.id, email: decoded.email };

    next();
  } catch (error) {
    throw new ApiError(401, "Unauthorized: Invalid token");
  }
};
