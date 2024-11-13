import * as z from 'zod';

export const LoginSchema = z.object({
  username: z.string({ required_error: 'Username is required' })
    .min(1, { message: 'Username is required' }),
  password: z.string({ required_error: 'Password is required' })
    .min(1, { message: 'Password is required' }),
});

export const RegisterSchema = z.object({
  sponsorship: z.string({ required_error: 'Sponsorship is required' })
    .min(1, { message: 'Sponsorship is required' }),
  username: z.string({ required_error: 'Username is required' })
    .min(1, { message: 'Username is required' }),
  password: z.string({ required_error: 'Password is required' })
    .min(1, { message: 'Password is required' }),
});
