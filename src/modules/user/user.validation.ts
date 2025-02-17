import { z } from 'zod';

const userSchema = z.object({
  name: z.string({ required_error: 'name is required' }),
  email: z.string({ required_error: 'email is required' }).email(),
  password: z
    .string({ required_error: 'password is required' })
    .min(6, { message: 'Password must be at least 6 characters' }),
  role: z.enum(['admin', 'user']).optional(),
  isBlocked: z.boolean().default(false).optional(),
});

export const userValidation = { userSchema };
