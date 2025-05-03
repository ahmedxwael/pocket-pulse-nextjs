"use server";

import prisma from "@/prisma/index";
import { cookies } from "@/shared/config/cookies";
import { URLS } from "@/shared/urls";
import { USER_SESSION_KEY } from "@/shared/utils";
import { redirect } from "next/navigation";
import { User } from "../types";

export async function getUser(): Promise<User | null> {
  const user = await cookies().get(USER_SESSION_KEY);
  if (!user || !user) {
    return null;
  }

  return user as User;
}

export async function updateUserAction(id: string, data: any) {
  const updatedUser = await prisma.user.update({
    where: {
      id,
    },
    data,
  });

  await cookies().set(USER_SESSION_KEY, updatedUser);
}

export async function signout() {
  await cookies().remove(USER_SESSION_KEY);
  redirect(URLS.signIn);
}
