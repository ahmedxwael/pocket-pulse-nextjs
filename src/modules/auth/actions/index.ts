"use server";

import { User } from "@/modules/user/types";
import { cookies, signIn } from "@/shared/config";
import { URLS } from "@/shared/urls";
import { USER_SESSION_KEY } from "@/shared/utils";
import { Provider } from "../types";

type SignIn = {
  provider?: Provider;
  data?: Partial<User>;
};

export async function signInAction({ provider, data }: SignIn) {
  if (provider) {
    return await signIn(provider, {
      redirectTo: URLS.home,
    });
  }

  // handle sign-in with email logic.
  console.log("data", data);
}

export async function signOutAction() {
  await cookies().remove(USER_SESSION_KEY);
}
