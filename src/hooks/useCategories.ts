import { useEffect, useState } from "react";
import { listPublicCategories } from "../lib/api/categories";
import type { CategoryRecord } from "../lib/types";

export function useCategories() {
  const [categories, setCategories] = useState<CategoryRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    listPublicCategories()
      .then((data) => active && setCategories(data))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return { categories, loading };
}
