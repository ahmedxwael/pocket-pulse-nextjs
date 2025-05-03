import { cookies } from "@/shared/config/cookies";
import { USER_SESSION_KEY } from "@/shared/utils";
import { User } from "../types";

export async function getUser(): Promise<User | null> {
  const user = await cookies().get(USER_SESSION_KEY);

  if (!user || !user) {
    return null;
  }

  return user as User;
}
