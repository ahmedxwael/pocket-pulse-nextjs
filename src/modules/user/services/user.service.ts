import { db } from "@/drizzle";
import { users } from "@/drizzle/schema/user";
import { eq } from "drizzle-orm";
import type { Account, User } from "next-auth";

/**
 * Get user
 * @param email
 * @returns
 */
export async function getUserService(email: string) {
  if (!email) {
    return {
      data: null,
      message: "Email is required",
      error: "Email is required",
    };
  }

  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (!user) {
    return {
      data: null,
      message: ".",
      error: ".",
    };
  }

  return {
    data: user,
    message: "User found successfully",
    error: null,
  };
}

/**
 * Create user
 * @param user
 * @param account
 * @returns
 */
export async function createUserService({
  user,
}: {
  user: User;
  account?: Account | null;
}) {
  if (!user) {
    return {
      data: null,
      message: "User is required",
      error: "User is required",
    };
  }

  const newUser = await db
    .insert(users)
    .values({
      email: user.email!,
      name: user.name!,
      image: user.image || `https://ui-avatars.com/api/?name=${user.name}`,
    })
    .returning({
      id: users.id,
      email: users.email,
      name: users.name,
      role: users.role,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
      balance: users.balance,
      currency: users.currency,
      newUser: users.newUser,
      incomesCount: users.incomesCount,
      expensesCount: users.expensesCount,
      emailVerified: users.emailVerified,
      image: users.image,
    });

  return {
    data: newUser[0],
    message: "User created successfully!",
    error: null,
  };
}

/**
 * Update user
 * @param id
 * @param data
 * @returns
 */
export async function updateUserService({
  id,
  data,
}: {
  id: string;
  data: any;
}) {
  try {
    const updatedUser = await db
      .update(users)
      .set(data)
      .where(eq(users.id, parseInt(id)))
      .returning();

    return {
      data: updatedUser,
      message: "User updated successfully!",
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      message: "User not found!",
      error: `Something went wrong: ${error}`,
    };
  }
}
