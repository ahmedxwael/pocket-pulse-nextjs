"use server";

import { cookies } from "next/headers";

export async function setCookieAction(name: string, value: string) {
  const cookiesStore = await cookies();

  return cookiesStore.set(name, value);
}

export async function getCookieAction(name: string) {
  const cookiesStore = await cookies();

  return cookiesStore.get(name);
}

export async function removeCookieAction(name: string) {
  const cookiesStore = await cookies();

  return cookiesStore.delete(name);
}
