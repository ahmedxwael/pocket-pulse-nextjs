"use server";

import {
  createCategoryService,
  deleteCategoryService,
  getCategoriesService,
} from "../services";

export const getCategoriesAction = getCategoriesService.bind(null);

export const createCategoryAction = createCategoryService.bind(null);

export const deleteCategoryAction = deleteCategoryService.bind(null);
