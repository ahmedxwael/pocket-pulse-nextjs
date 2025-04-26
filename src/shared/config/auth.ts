import {
  createUserService,
  getUserService,
} from "@/modules/user/services/user.service";
import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, Github],
  callbacks: {
    async session({ session }) {
      if (!session.user || !session.user.email) {
        return session;
      }

      const { data: user } = await getUserService(session.user.email);

      if (user) {
        session.user = {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
          balance: user.balance,
          incomesCount: user.incomesCount,
          expensesCount: user.expensesCount,
          isVerified: user.isVerified,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          emailVerified: user.emailVerified,
          provider: user.provider,
        };
      }

      return session;
    },
    async signIn({ user, account }) {
      try {
        const { data: storedUser } = await getUserService(
          user?.email as string
        );

        if (!storedUser && user) {
          await createUserService({ user, account });
        }

        return true;
      } catch (error) {
        console.error("Error signing in:", error);
        return false;
      }
    },
  },
});
