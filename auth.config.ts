import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextAuthConfig } from 'next-auth';
import bcrypt from 'bcryptjs';

import { LoginSchema } from '@/lib/schemas/authSchemas';
import { getProfileByUsername } from '@/lib/actions/profile';

export default {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { username, password } = validatedFields.data;

          const profile = await getProfileByUsername(username);
          if (!profile || !profile.password) return null;

          const passwordsMatch = await bcrypt.compare(
            password,
            profile.password
          );

          if (passwordsMatch) return profile;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
