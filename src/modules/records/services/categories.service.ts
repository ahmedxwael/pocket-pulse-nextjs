import { Params } from "@/design-system/types";
import { getCurrentUser } from "@/modules/user/actions";
import prisma from "@/prisma/index";
import { Category } from "../types";

type CategoriesResponse = {
  data: Category[] | null;
  message: string;
  error: string | null;
};

export async function getCategoriesService(
  params: Params = {}
): Promise<CategoriesResponse> {
  const user = await getCurrentUser();

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
    data: categories as Category[],
    message: "Categories found successfully",
    error: null,
  };
}
