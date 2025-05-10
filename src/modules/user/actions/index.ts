"use server";

import { cookies } from "@/shared/config/cookies";
import { USER_SESSION_KEY } from "@/shared/utils";
import { getUserService, updateUserService } from "../services";
import { User } from "../types";

export async function getCurrentUser(): Promise<User | null> {
  const user = await cookies().get(USER_SESSION_KEY);

  if (!user) {
    return null;
  }

  return user as User;
}

export async function getUser(email: string) {
  return await getUserService(email);
}

export async function updateUser(id: string, data: any) {
  const updatedUser = await updateUserService({ id, data });

  await cookies().set(USER_SESSION_KEY, updatedUser);
}
