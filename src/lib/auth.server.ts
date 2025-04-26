import { getUser } from "@/modules/user/utils";
import { URLS } from "@/shared/urls";
import { redirect } from "next/navigation";

export async function requireAuth() {
  const user = await getUser();

  return {
    guarded: (redirectUrl = URLS.signIn) => {
      if (!user) {
        throw redirect(redirectUrl);
      }
      return user;
    },
    reverseGuarded: (redirectUrl = URLS.home) => {
      if (user) {
        throw redirect(redirectUrl);
      }
      return null;
    },
    user,
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
