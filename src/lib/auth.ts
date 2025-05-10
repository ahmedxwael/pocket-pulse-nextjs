import { getCurrentUser } from "@/modules/user/actions";
import { URLS } from "@/shared/urls";
import { redirect } from "next/navigation";

export async function requireAuth() {
  const user = await getCurrentUser();

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

export async function guardedRoute(redirectUrl?: string) {
  const { guarded } = await requireAuth();

  return guarded(redirectUrl);
}

export async function reverseGuardedRoute(redirectUrl?: string) {
  const { reverseGuarded } = await requireAuth();

  return reverseGuarded(redirectUrl);
}
