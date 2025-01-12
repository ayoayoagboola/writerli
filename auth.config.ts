import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

import { LoginSchema } from "./schemas/auth";
import { getUserByEmail } from "./data/user/user";

import Google from "next-auth/providers/google";

// TODO: add two-factor authentication + email verification

export default {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      async authorize(credentials) { // fix credentials 
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;
          console.log("User found:", user);

          const passwordsMatch = await bcrypt.compare(password, user.password);
          console.log("Passwords match:", passwordsMatch);

          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  debug: true, 
} satisfies NextAuthConfig;
