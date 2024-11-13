import type { NextAuthConfig } from "next-auth"

import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./lib/schemas/authSchemas";
import { getProfileById, getProfileByUsername } from "./lib/actions/profile";
import bcrypt from 'bcryptjs';
import NextAuth from "next-auth";

export const authOptions: NextAuthConfig = {
  providers: [
    Credentials({
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
    })
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      // @ts-ignore
      session.isAuthenticated = true;

      const profile = await getProfileById(session.user.id);

      if (!profile) {
        // @ts-ignore
        session.isAuthenticated = false;
      }

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  trustHost: true,
}

export const {
  signIn,
  signOut,
  auth,
} = NextAuth(authOptions);
