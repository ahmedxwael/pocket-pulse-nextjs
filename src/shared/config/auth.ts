import {
  createUserService,
  getUserService,
} from "@/modules/user/services/user.service";
import { User } from "@/modules/user/types";
import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { only, USER_ALLOWED_FIELDS, USER_SESSION_KEY } from "../utils";
import { cookies } from "./cookies";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, Github],
  callbacks: {
    async signIn({ user, account }) {
      try {
        const { data: storedUser } = await getUserService(
          user?.email as string
        );
        let data = storedUser;

        if (!storedUser && user) {
          const { data: newUser } = await createUserService({ user, account });
          data = newUser;
        }

        await cookies().set(
          USER_SESSION_KEY,
          data ? only(data as User, USER_ALLOWED_FIELDS) : {}
        );

        return true;
      } catch (error) {
        console.error("Error signing in:", error);
        return false;
      }
    },
  },
});
