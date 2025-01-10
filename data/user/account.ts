import { accounts } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";

// TODO: add two-factor authentication + email verification

export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await db.query.accounts.findFirst({
      where: eq(accounts.userId, userId),
    });

    return account;
  } catch {
    return null;
  }
};
