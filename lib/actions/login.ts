'use server';

import * as z from 'zod';
import { AuthError } from 'next-auth';

import { signIn } from "@/auth";
import { LoginSchema } from '@/lib/schemas/authSchemas';

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { username, password } = validatedFields.data;

  try {
    await signIn('credentials', {
      username,
      password,
      redirectTo: '/',
    });

    // Successful signIn will stop the execution of this function before, but we need this return to satisfy TypeScript
    return { success: 'Logged in successfully!' };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: 'Invalid credentials!' };
        default:
          return { error: 'Something went wrong!' };
      }
    }

    throw error;
  }
}