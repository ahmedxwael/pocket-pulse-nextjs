"use client";

import { loadingOverlayAtom } from "@/design-system/atoms";
import { toastError, toastSuccess } from "@/design-system/components";
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
  const [categories, setCategories] = useState<Category[]>(cachedCategories);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    if (cachedCategories.length === categories.length) {
      return;
    }

    try {
      setLoading(true);
      const { data } = await getCategoriesAction();
      setCategories(data || []);
      cachedCategories = data || [];
    } catch (e) {
      toastError("Couldn't get the categories");
    } finally {
      setLoading(false);
    }
  };

  const add = async (category: Pick<Category, "name" | "createdById">) => {
    try {
      loadingOverlayAtom.start();
      const { data } = await createCategoryAction({
        data: category,
      });

      if (!data) {
        toastError("Couldn't add the category");
        return;
      }

      setCategories((prev) => {
        const updated = [...prev];
        updated.push(data);
        return updated;
      });

      cachedCategories.push(data);

      toastSuccess("Category created successfully");
    } catch (e) {
      toastError("Couldn't add the category");
    } finally {
      loadingOverlayAtom.stop();
    }
  };

  const remove = async (id: string) => {
    try {
      loadingOverlayAtom.start();
      await deleteCategoryAction(id);
      setCategories((prev) => prev.filter((category) => category.id !== id));
      cachedCategories = cachedCategories.filter(
        (category) => category.id !== id
      );
      toastSuccess("Category deleted successfully");
    } catch (e) {
      toastError("Couldn't delete the category");
    } finally {
      loadingOverlayAtom.stop();
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
