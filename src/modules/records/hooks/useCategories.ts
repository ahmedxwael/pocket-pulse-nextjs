import { useEffect, useState } from "react";
import { getCategoriesAction } from "../actions";
import { Category } from "../types";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getCategoriesAction()
      .then((data) => {
        if (data) {
          setCategories(data);
        }
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { categories, setCategories, error, loading };
}
