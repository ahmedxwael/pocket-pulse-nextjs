import { getUser } from "@/modules/user/utils";
import prisma from "@/prisma/index";

export async function getCategoriesService() {
  const user = await getUser();

  if (!user) {
    return {
      data: null,
      message: "Unauthorized",
      error: "Unauthorized",
    };
  }

  const categories = await prisma.category.findMany({
    where: {
      createdById: user.id,
    },
  });

  if (!categories) {
    return {
      data: null,
      message: ".",
      error: ".",
    };
  }

  return {
    data: categories,
    message: "User found successfully",
    error: null,
  };
}
