import { z } from 'zod';
import { todoSchema } from './todo';

export const categorySchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  color: z.string().optional(),
  userId: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  todos: z.array(todoSchema).optional(),
});

export const createCategorySchema = z.object({
  name: z.string().min(1),
  color: z.string().optional(),
});

export const updateCategorySchema = z.object({
  name: z.string().min(1).optional(),
  color: z.string().optional(),
});

export type Category = z.infer<typeof categorySchema>;
export type CreateCategoryData = z.infer<typeof createCategorySchema>;
export type UpdateCategoryData = z.infer<typeof updateCategorySchema>;
