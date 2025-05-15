import { toastError, toastSuccess } from "@/design-system/components";
import { loadingOverlayStore } from "@/design-system/stores";
import { useEffect, useState } from "react";
import {
  createCategoryAction,
  deleteCategoryAction,
  getCategoriesAction,
} from "../actions";
import { Category } from "../types";

type UseCategoriesProps = {
  init?: boolean;
};

let cachedCategories: Category[] = [];

export function useCategories({ init = false }: UseCategoriesProps = {}) {
  const { setLoading: setLoadingOverlay } = loadingOverlayStore();

  const [categories, setCategories] = useState<Category[]>(cachedCategories);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    if (cachedCategories.length > 0) {
      return;
    }

    try {
      setLoading(true);
      const { data } = await getCategoriesAction();
      setCategories(data || []);
      cachedCategories = data || [];
    } catch (e) {
      console.log(e);
      toastError("Couldn't get the categories");
    } finally {
      setLoading(false);
    }
  };

  const add = async (
    category: Pick<Category, "name" | "type" | "createdById">
  ) => {
    try {
      setLoadingOverlay(true);
      const { data } = await createCategoryAction(category);

      setCategories((prev) => [...prev, data]);
      cachedCategories.push(data);

      toastSuccess("Category created successfully");
    } catch (e) {
      console.log(e);
      toastError("Couldn't add the category");
    } finally {
      setLoadingOverlay(false);
    }
  };

  const remove = async (id: string) => {
    try {
      setLoadingOverlay(true);
      await deleteCategoryAction(id);
      setCategories((prev) => prev.filter((category) => category.id !== id));
      cachedCategories = cachedCategories.filter(
        (category) => category.id !== id
      );
      toastSuccess("Category deleted successfully");
    } catch (e) {
      console.log(e);
      toastError("Couldn't delete the category");
    } finally {
      setLoadingOverlay(false);
    }
  };

  useEffect(() => {
    if (init) {
      load();
    }
  }, [init]);

  return {
    categories,
    setCategories,
    load,
    add,
    remove,
    loading,
  };
}
