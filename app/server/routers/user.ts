import { z } from "zod";

import { eq } from "drizzle-orm";
import { protectedProcedure, publicProcedure, router } from "../trpc";
import { users } from "@/db/schema";
import { getUserByEmail } from "@/data/user/user";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import { TRPCError } from "@trpc/server";

// TODO: add more user-related procedures (delete account, update account, etc.)

export const userRouter = router({
  getUserById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.query.users.findFirst({
        where: eq(users.id, input.id),
      });
      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }
      return user;
    }),

  logIn: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .mutation(async ({ input }) => {
      const existingUser = await getUserByEmail(input.email);

      if (!existingUser) {
        return { error: "This account doesn't exist!" };
      }

      try {
        const result = await signIn("credentials", {
          ...input,

          redirect: false,
        });

        if (result?.error) {
          return { error: result.error };
        }

        return { success: "Login successful!" }; // Return a success message
      } catch (error) {
        if (error instanceof AuthError) {
          switch (error.type) {
            case "CredentialsSignin":
              return { error: "Invalid credentials!" };
            default:
              return { error: "Something went wrong!" };
          }
        }

        return { error: "Unexpected error occurred." };
      }
    }),

  register: publicProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        password: z.string().min(8),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const existingUser = await getUserByEmail(input.email);

      if (existingUser) {
        return { error: "This account already exists!" };
      }

      const { firstName, lastName, email, password } = input;

      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await ctx.db.insert(users).values({
          firstName,
          lastName,
          email,
          password: hashedPassword,
        });
        return { success: "Account created successfully!" };
      } catch {
        return { error: "Something went wrong while creating your account!" };
      }
    }),
});
