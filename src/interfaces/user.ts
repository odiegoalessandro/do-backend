import { z } from 'zod';

export const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;


export const userSchema = z.object({
  id: z.string(),
  email: z.string().regex(emailRegex, { message: 'Email inválido' }),
  password: z.string(),
});

export const userWithoutPasswordSchema = userSchema.omit({
  password: true,
});

export const authResponseSchema = z.object({
  token: z.string(),
  user: userSchema,
});

export const loginCredentialsSchema = z.object({
  email: z.string().regex(emailRegex, { message: 'Email inválido' }),
  password: z.string().min(1),
});

export const registerCredentialsSchema = z.object({
  email: z.string().regex(emailRegex, { message: 'Email inválido' }),
  password: z.string().min(8),
  name: z.string().min(1),
});

export type User = z.infer<typeof userSchema>;
export type UserWithoutPassword = z.infer<typeof userWithoutPasswordSchema>;
export type AuthResponse = z.infer<typeof authResponseSchema>;
export type LoginCredentials = z.infer<typeof loginCredentialsSchema>;
export type RegisterCredentials = z.infer<typeof registerCredentialsSchema>;
