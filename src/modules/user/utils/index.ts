import { auth } from "@/shared/config/auth";
import { User } from "../types";

export async function getUser(): Promise<User | null> {
  const session = await auth();

  if (!session || !session.user) {
    return null;
  }

  return session.user as User;
}
