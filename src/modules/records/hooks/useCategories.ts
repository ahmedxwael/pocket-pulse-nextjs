import { useEffect, useState } from "react";
import { Category } from "../types";
import { getCategoriesService } from "../services";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCategoriesService().then(({ data }) => {
      if (data) {
        setCategories(data);
      }
    });
  }, []);

  return { categories, setCategories };
}
