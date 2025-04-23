import prisma from "@/prisma/index";
import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google, Github],
  callbacks: {
    async session({ session }: any) {
      const user = await prisma.user.findUnique({
        where: { email: session?.user?.email },
      });

      if (user) {
        session.user = {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
          balance: user.balance,
          isVerified: user.emailVerified,
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
        const storedUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        if (!storedUser && user) {
          await prisma.user.create({
            data: {
              email: user.email!,
              name: user.name!,
              image: user.image,
              provider: account?.provider,
            },
          });
        }

        return true;
      } catch (error) {
        console.error("Error signing in:", error);
        return false;
      }
    },
  },
});
