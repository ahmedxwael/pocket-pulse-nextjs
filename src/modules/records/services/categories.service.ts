import { authorized } from "@/modules/account/utils";
import prisma from "@/prisma/index";
import { asyncHandler } from "@/shared/utils";
import {
  CategoryGeneralParams,
  CategoryListResponse,
  CategoryPostParams,
  CategoryResponse,
} from "../types";

/**
 * Retrieve categories
 */
export const getCategoriesService: (
  params?: CategoryGeneralParams
) => Promise<CategoryListResponse> = await asyncHandler(
  async (params = {} as CategoryGeneralParams) => {
    const { user } = await authorized();

    const categories = await prisma.category.findMany({
      ...params,
      where: {
        ...params.where,
        createdById: user.id,
      },
    });

    return {
      data: categories,
      message: "Categories found successfully",
      error: null,
    };
  }
);

/**
 * Retrieve a single category
 */
export const getCategoryService: (
  id: string,
  params?: CategoryGeneralParams
) => Promise<CategoryResponse> = await asyncHandler(
  async (id: string, params: CategoryGeneralParams = {}) => {
    const { user } = await authorized();

    const category = await prisma.category.findUnique({
      ...params,
      where: {
        ...(params?.where || {}),
        id,
        createdById: user.id,
      },
    });

    return {
      data: category,
      message: "Category found successfully",
      error: null,
    };
  }
);

/**
 * Create a new category
 */
export const createCategoryService: (
  params: CategoryPostParams
) => Promise<CategoryResponse> = await asyncHandler(
  async (params: CategoryPostParams) => {
    const { data } = params;
    const { user } = await authorized();

    const category = await prisma.category.create({
      ...params,
      data: {
        name: data.name,
        createdById: user.id,
      },
    });

    return {
      data: category,
      message: "Category created successfully",
      error: null,
    };
  }
);

/**
 * Delete a category
 */
export const deleteCategoryService: (id: string) => Promise<CategoryResponse> =
  await asyncHandler(async (id: string) => {
    const { user } = await authorized();

    const category = await prisma.category.delete({
      where: {
        id,
        createdById: user.id,
      },
    });

    return {
      data: category,
      message: "Category deleted successfully",
      error: null,
    };
  });
