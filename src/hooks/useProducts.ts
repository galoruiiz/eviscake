import { useEffect, useState } from "react";
import { listPublicProducts } from "../lib/api/products";
import type { Product } from "../lib/types";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    listPublicProducts()
      .then((data) => active && setProducts(data))
      .catch(() => active && setError(true))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  return { products, loading, error };
}
