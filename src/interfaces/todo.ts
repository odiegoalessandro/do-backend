import { z } from 'zod';

export const todoSchema = z.object({
  id: z.string(),
  description: z.string().min(1),
  status: z.boolean(),
  categoryId: z.string(),
  userId: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const createTodoSchema = z.object({
  description: z.string().min(1),
  categoryId: z.string(),
});

export const updateTodoSchema = z.object({
  description: z.string().min(1).optional(),
  status: z.boolean().optional(),
  categoryId: z.string().optional(),
});

export type Todo = z.infer<typeof todoSchema>;
export type CreateTodoData = z.infer<typeof createTodoSchema>;
export type UpdateTodoData = z.infer<typeof updateTodoSchema>;
