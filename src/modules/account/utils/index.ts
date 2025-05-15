import { getCurrentUser } from "@/modules/user/actions";

export async function authorized() {
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return {
    data: user,
    message: "Authorized",
    error: null,
  };
}
