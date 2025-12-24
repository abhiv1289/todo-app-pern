import { z } from "zod";
import { de, id } from "zod/v4/locales";

const createTodoSchema = z.object({
  body: z.object({
    title: z.string().min(1, { message: "Title is required" }),
    description: z.string().optional(),
  }),
});

const updateTodoSchema = z.object({
  params: z.object({
    id: z.string().uuid({ message: "Invalid todo ID" }),
  }),
  body: z.object({
    title: z.string().min(1, { message: "Title is required" }).optional(),
    description: z.string().optional(),
    is_completed: z.boolean().optional(),
  }),
});

const getTodoSchema = z.object({
  query: z.object({
    page: z
      .string()
      .optional()
      .transform((val) => Number(val))
      .refine((val) => !val || val > 0, {
        message: "Page must be a positive number",
      }),
    limit: z
      .string()
      .optional()
      .transform((val) => Number(val))
      .refine((val) => !val || val > 0, {
        message: "Limit must be between 1 and 50",
      }),
  }),
});

export { createTodoSchema, updateTodoSchema, getTodoSchema };
