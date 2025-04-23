import { auth } from "@/shared/config/auth";
import { URLS } from "@/shared/urls";
import { redirect } from "next/navigation";

export async function requireAuth() {
  const session = await auth();

  return {
    guarded: (redirectUrl = URLS.signIn) => {
      if (!session) {
        throw redirect(redirectUrl);
      }
      return session;
    },
    reverseGuarded: (redirectUrl = URLS.home) => {
      if (session) {
        throw redirect(redirectUrl);
      }
      return null;
    },
    session,
  };
}

export const guardedRoute = async (redirectUrl?: string) => {
  const { guarded } = await requireAuth();
  return guarded(redirectUrl);
};

export const reverseGuardedRoute = async (redirectUrl?: string) => {
  const { reverseGuarded } = await requireAuth();
  return reverseGuarded(redirectUrl);
};
