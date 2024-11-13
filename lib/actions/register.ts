'use server';

import bcrypt from 'bcryptjs';
import * as z from 'zod';

import { db } from '@/lib/db';
import { RegisterSchema } from '@/lib/schemas/authSchemas';
import { Profile } from '@prisma/client';
import { getProfileByUsername } from '@/lib/actions/profile';
import { signIn } from '@/auth';

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { username, sponsorship, password } = values;
  const hashedPassword = await bcrypt.hash(password, 10);

  // make sure the sponsorship exists
  const existingSponsorship = await db.sponsorship.findUnique({
    where: {
      key: sponsorship,
    },
  });
  if (!existingSponsorship) {
    return { error: '--sponsorship: Invalid sponsorship' };
  }

  // make sure the email is unique
  const existingProfile: Profile | null = await getProfileByUsername(username);
  if (existingProfile) {
    return { error: 'Username already exists' };
  }

  console.log('[REGISTER] Using sponsorship key to create user "', username, '"');

  await db.profile.create({
    data: {
      username,
      password: hashedPassword,
    },
  });

  // one use only sponsorship
  await db.sponsorship.delete({
    where: {
      id: existingSponsorship.id
    }
  });

  // now we sign the user up
  await signIn('credentials', {
    username,
    password,
    redirectTo: '/',
  });

  // We never get to this point because the user is redirected to the homepage once the user is signed in
  return { success: 'User created! Redirecting...' };
}