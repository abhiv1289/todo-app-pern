import { ZodError } from "zod";
import { ApiError } from "../utils/ApiError.js";

const validate = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      params: req.params,
      query: req.query,
    });
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      const formattedErrors = error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));
      return next(new ApiError(400, "Validation Error", formattedErrors));
    }
  }
};

export { validate };
