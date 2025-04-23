"use server";

import { signIn } from "@/shared/config/auth";

export async function loginAction(provider: "google" | "github") {
  await signIn(provider);
}
