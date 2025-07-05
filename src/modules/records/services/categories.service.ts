import { db } from "@/drizzle";
import { categories } from "@/drizzle/schema";
import { authorized } from "@/modules/account/utils";
import { asyncHandler } from "@/shared/utils";
import { and, eq } from "drizzle-orm";
import { CategoryData, CategoryListResponse, CategoryResponse } from "../types";

/**
 * Retrieve categories
 */
export const getCategoriesService: () => Promise<CategoryListResponse> =
  await asyncHandler(async () => {
    const { user } = await authorized();

    const records = await db.query.categories.findMany({
      where: eq(categories.userId, parseInt(user.id)),
    });

    return {
      data: records,
      message: "Categories found successfully",
      error: null,
    };
  });

/**
 * Retrieve a single category
 */
export const getCategoryService: (id: string) => Promise<CategoryResponse> =
  await asyncHandler(async (id: string) => {
    const { user } = await authorized();

    const category = await db.query.categories.findFirst({
      where: and(
        eq(categories.id, parseInt(id)),
        eq(categories.userId, parseInt(user.id))
      ),
    });

    if (!category) {
      return {
        data: null,
        message: "Category not found",
        error: "Category not found",
      };
    }

    return {
      data: category,
      message: "Category found successfully",
      error: null,
    };
  });

/**
 * Create a new category
 */
export const createCategoryService: (
  data: CategoryData
) => Promise<CategoryResponse> = await asyncHandler(
  async (data: CategoryData) => {
    const { user } = await authorized();

    const category = await db.insert(categories).values({
      name: data.name,
      userId: parseInt(user.id),
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

    const category = await db
      .delete(categories)
      .where(
        and(
          eq(categories.id, parseInt(id)),
          eq(categories.userId, parseInt(user.id))
        )
      );

    return {
      data: category,
      message: "Category deleted successfully",
      error: null,
    };
  });
