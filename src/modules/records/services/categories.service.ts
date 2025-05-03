import { Params } from "@/design-system/types";
import { getUser } from "@/modules/user/actions";
import prisma from "@/prisma/index";

export async function getCategoriesService(params: Params = {}) {
  const user = await getUser();

  if (!user) {
    return {
      data: null,
      message: "Unauthorized",
      error: "Unauthorized",
    };
  }

  const categories = await prisma.category.findMany({
    ...params,
    where: {
      ...params.where,
      createdById: user.id,
    },
  });

  if (!categories) {
    return {
      data: null,
      message: "No categories found",
      error: null,
    };
  }

  return {
    data: categories,
    message: "Categories found successfully",
    error: null,
  };
}
