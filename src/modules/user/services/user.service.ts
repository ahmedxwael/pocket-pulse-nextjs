/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/prisma/index";
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

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
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
  account,
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

  const newUser = await prisma.user.create({
    data: {
      email: user.email!,
      name: user.name!,
      image: user.image,
      provider: account?.provider || null,
    },
  });

  return {
    data: newUser,
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
    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data,
    });

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
