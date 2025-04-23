import prisma from "@/prisma/index";

export async function getUserService(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return {
        data: null,
        message: "Invalid credentials.",
        error: "Invalid credentials.",
      };
    }

    return {
      data: user,
      message: "User found successfully",
      error: null,
    };
  } catch (error: any) {
    console.error("Error fetching user:", error);
    return {
      data: null,
      message: "Invalid credentials.",
      error: "Invalid credentials.",
    };
  }
}
