import { z } from 'zod';

const email = z.string().trim().email().transform((value) => value.toLowerCase());

export const registerSchema = z.object({
  name: z.string().trim().min(1).max(255),
  email,
  password: z.string().min(8).max(72),
  confirmPassword: z.string(),
}).refine((value) => value.password === value.confirmPassword, { path: ['confirmPassword'], message: 'Passwords do not match' });

export const loginSchema = z.object({ email, password: z.string().min(1) });
