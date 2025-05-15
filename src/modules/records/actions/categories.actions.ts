"use server";

import { Params } from "@/design-system/types";
import {
  createCategoryService,
  deleteCategoryService,
  getCategoriesService,
} from "../services";
import { Category } from "../types";

export async function getCategoriesAction(params: Params = {}) {
  return await getCategoriesService(params);
}

export async function createCategoryAction(
  category: Pick<Category, "name" | "type" | "createdById">
) {
  return await createCategoryService(category);
}

export async function deleteCategoryAction(id: string) {
  return await deleteCategoryService(id);
}
