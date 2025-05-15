import { Params } from "@/design-system/types";
import { authorized } from "@/modules/account/utils";
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
  const { data: user } = await authorized();

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

export async function createCategoryService(
  categoryData: Pick<Category, "name" | "type">
) {
  const { data: user } = await authorized();

  const category = await prisma.category.create({
    data: {
      name: categoryData.name,
      type: categoryData.type,
      createdById: user.id,
    },
  });

  return {
    data: category as Category,
    message: "Category created successfully",
    error: null,
  };
}

export async function deleteCategoryService(id: string) {
  const { data: user } = await authorized();

  const category = await prisma.category.delete({
    where: {
      id,
      createdById: user.id,
    },
  });

  return {
    data: category as Category,
    message: "Category deleted successfully",
    error: null,
  };
}
