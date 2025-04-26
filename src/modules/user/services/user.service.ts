import prisma from "@/prisma/index";
import type { Account, User } from "next-auth";

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

  await prisma.user.create({
    data: {
      email: user.email!,
      name: user.name!,
      image: user.image,
      provider: account?.provider || null,
      emailVerified: new Date(),
    },
  });
}
